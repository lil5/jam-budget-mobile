import React, { Component } from 'react'

// redux
import { Provider } from 'react-redux'
import store from './store'

import App from './components/App'

export default class extends Component {
  render () {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
