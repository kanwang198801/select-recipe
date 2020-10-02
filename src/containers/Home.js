import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Select } from 'antd'
import { Helmet } from 'react-helmet'
import Theme from '../components/Theme'
import Step from '../components/Step'
import Data from '../data/input.json'

const { Option } = Select
const Home = () => {
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [step, setStep] = useState(1)
  const [history, setHistory] = useState([])
  const onFinish = () => {
    console.info('submit')
  }
  useEffect(() => {
    const historyData = localStorage.getItem('history')
    setRecipes(Data.recipes)
    if (historyData) {
      setHistory(JSON.parse(historyData))
    }
  }, [])
  return (
    <Theme>
      <Helmet>
        <title>Home</title>
        <meta name="Home" content="Home Page" />
      </Helmet>
      <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
        <h1>Find a recipe</h1>
        <Step title="Step 1: Add your username" showing={step === 1}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <div className="buttonGroup">
            <Button onClick={() => setStep(2)}>Next</Button>
          </div>
        </Step>
        <Step title="Step 2: Select recipe type" showing={step === 2}>
          <Form.Item
            name="recipeType"
            rules={[{ required: true, message: 'Recipe type is required' }]}
          >
            <Select placeholder="Select a recipe type">
              {recipes.map((recipe) => (
                <Option value={recipe.name}>{recipe.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <div className="buttonGroup">
            <Button onClick={() => setStep(1)}>Prev</Button>
            <Button onClick={() => setStep(3)}>Next</Button>
          </div>
        </Step>
        <Step title="Step 3: Select a meal" showing={step === 3}>
          <Form.Item
            name="meal"
            rules={[{ required: true, message: 'Meal is required' }]}
          >
            <Select placeholder="Select a meal">
              <Option value="1">1</Option>
              <Option value="2">2</Option>
            </Select>
          </Form.Item>
          <div className="buttonGroup">
            <Button onClick={() => setStep(2)}>Prev</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Step>
      </Form>
    </Theme>
  )
}

export default Home
