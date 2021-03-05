import React from 'react'
import Google from './components/Google'
import Results from "./components/Results"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component = {Google}/>
        <Route path="/:city" exact component = {Results}/>
      </Switch>
    </Router>
  )
}

export default App
