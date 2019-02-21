import ReactDOM from 'react-dom'
import React from 'react'
import App from './App.jsx'

const root = document.getElementById('root')
const render = (Component) => {
  ReactDOM.render(<Component />, root)
}
render(App)
