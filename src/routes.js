import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './containers/Home'
import NotFoundPage from './containers/NotFoundPage'

const Index = () => (
  <Route
    render={({ location }) => (
      <Switch location={location}>
        <Route path="/" component={Home} key="Home" exact={true} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    )}
  />
)

export default Index
