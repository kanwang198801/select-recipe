import React from 'react'
import { Helmet } from 'react-helmet'
import Theme from '../components/Theme'

const Home = () => {
  return (
    <Theme>
      <Helmet>
        <title>Home</title>
        <meta name="Home" content="Home Page" />
      </Helmet>
      <h1>Home</h1>
    </Theme>
  )
}

export default Home
