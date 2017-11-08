import React, { Component } from 'react'
import App from './components/App'

import { ThemeProvider } from 'react-native-material-ui'
import uiTheme from './styles/Theme'

export default class extends Component {
  render () {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <App />
      </ThemeProvider>
    )
  }
}
