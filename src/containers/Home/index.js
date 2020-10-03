import { Button, Form, Input, Modal, Select } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

// import writeJsonFile from 'write-json-file'
import History from '../../components/History'
import Theme from '../../components/Theme'
import Data from '../../data/input.json'
import { isUserNameUsed } from '../../utils'

const { Option } = Select

// TODO:export/save to a json file
// TODO:add options for existing username
const Home = () => {
  const [recipeList, setRecipeList] = useState([])
  const [selectedRecipeType, setSelectedRecipeType] = useState(null)
  const [history, setHistory] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [existingUserNameData, setExistingUserNameData] = useState(null)
  const [form] = Form.useForm()
  const showRecipes = selectedRecipeType && selectedRecipeType.recipes.length > 0

  useEffect(() => {
    setRecipeList(Data.recipeList)
  }, [])

  const clearForm = useCallback(() => {
    form.resetFields()
    setExistingUserNameData(null)
    setSelectedRecipeType(null)
  }, [])

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
      const newHistory = [...history, newRecord]
      setHistory(newHistory)
      clearForm()
      // const writeJsonFile = require('write-json-file')
      // ;(async () => {
      //   await writeJsonFile('./output.json', newHistory)
      // })()
    },
    [history]
  )

  const onRecipeTypeChange = useCallback(
    (recipeTypeTitle) => {
      setSelectedRecipeType(
        recipeList.find(
          (recipeType) => recipeType.recipeTypeTitle === recipeTypeTitle
        )
      )
    },
    [recipeList]
  )
  const replaceExistingRecord = () => {
    let newHistory = history.filter(
      (record) => record.userName !== existingUserNameData.userName
    )
    newHistory = [...newHistory, existingUserNameData]
    newHistory.push()
    setHistory(newHistory)
    setShowModal(false)
  }
  const createNewSelection = () => {
    clearForm()
    setShowModal(false)
  }
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
