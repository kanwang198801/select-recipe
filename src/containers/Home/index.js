import { Button, Form, Input, message, Modal, Select } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import History from '../../components/History'
import Theme from '../../components/Theme'
import { HISTORY_API, RECIPES_API } from '../../constants'
import { isUserNameUsed, replaceExistingRecordByUserName } from '../../utils'

const { Option } = Select

const Home = () => {
  const [recipeList, setRecipeList] = useState([])
  const [selectedRecipeType, setSelectedRecipeType] = useState(null)
  const [history, setHistory] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [existingUserNameData, setExistingUserNameData] = useState(null)
  const [form] = Form.useForm()
  const showRecipes = selectedRecipeType && selectedRecipeType.recipes.length > 0

  useEffect(() => {
    fetch(RECIPES_API)
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setRecipeList(data.data)
        }
      })

    fetch(HISTORY_API)
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          setHistory(data.data)
        }
      })
  }, [])

  const clearForm = useCallback(() => {
    form.resetFields()
    setExistingUserNameData(null)
    setSelectedRecipeType(null)
    setShowModal(false)
  }, [])

  const postRequestHistory = useCallback(
    (newRecord, action) => {
      fetch(HISTORY_API, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ newRecord, action }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'succuss') {
            if (action === 'replace') {
              setHistory(
                replaceExistingRecordByUserName(history, existingUserNameData)
              )
            } else {
              const newHistory = [...history, newRecord]
              setHistory(newHistory)
            }
            message.success(data.message)
          } else {
            message.error(data.message)
          }
        })
        .catch(() => {
          message.error('API error')
        })
    },
    [history, existingUserNameData]
  )

  const onFinish = useCallback(
    async (values) => {
      const { userName, recipeTypeTitle, recipe } = values
      const newRecord = {
        id: history.length > 0 ? history[history.length - 1].id + 1 : 0,
        userName,
        recipeTypeTitle,
        recipe,
      }
      if (isUserNameUsed(history, userName)) {
        setExistingUserNameData(newRecord)
        setShowModal(true)
        return
      }
      postRequestHistory(newRecord, 'create')
    },
    [history]
  )

  const onRecipeTypeChange = useCallback(
    // BUG: have to clear recipe
    (recipeTypeTitle) => {
      setSelectedRecipeType(
        recipeList.find(
          (recipeType) => recipeType.recipeTypeTitle === recipeTypeTitle
        )
      )
    },
    [recipeList]
  )
  const replaceExistingRecord = useCallback(() => {
    postRequestHistory(existingUserNameData, 'replace')
    clearForm()
  }, [existingUserNameData])

  const createNewSelection = useCallback(() => {
    clearForm()
  }, [])

  return (
    <Theme>
      <Helmet>
        <title>Home</title>
        <meta name="Home" content="Home Page" />
      </Helmet>
      <h1>Find a recipe</h1>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="userName"
          rules={[{ required: true, message: 'Please input your user name!' }]}
        >
          <Input placeholder="User name" />
        </Form.Item>
        <Form.Item
          name="recipeTypeTitle"
          rules={[{ required: true, message: 'Recipe type is required' }]}
        >
          <Select
            placeholder="Select a recipe type"
            onChange={(value) => onRecipeTypeChange(value)}
          >
            {recipeList.length > 0 &&
              recipeList.map((recipeType, index) => (
                <Option
                  key={`recipeTypeKey-${index}`}
                  value={recipeType.recipeTypeTitle}
                >
                  {recipeType.recipeTypeTitle}
                </Option>
              ))}
          </Select>
        </Form.Item>
        {showRecipes && (
          <>
            <Form.Item
              name="recipe"
              rules={[{ required: true, message: 'Recipe is required' }]}
            >
              <Select placeholder="Select a recipe">
                {selectedRecipeType.recipes.map((recipe, index) => (
                  <Option key={`recipeKey-${index}`} value={recipe}>
                    {recipe}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </>
        )}
      </Form>
      <History history={history} />
      <Modal
        centered
        visible={showModal}
        onOk={() => replaceExistingRecord()}
        onCancel={() => createNewSelection()}
        okText="Replace Existing"
        cancelText="New Selection"
        width={320}
      >
        <p>Replace existing or create new selection (with different name)</p>
      </Modal>
    </Theme>
  )
}

export default Home
