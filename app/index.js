import React, { Component } from 'react'
import App from './components/App'
import InputNumber from './components/InputNumber'

import { StackNavigator } from 'react-navigation'

import { ThemeProvider } from 'react-native-material-ui'
import Theme from './styles/Theme'

const RootNavigator = StackNavigator({
  Home: { screen: App },
  InputNumber: { screen: InputNumber },
})

export default class extends Component {
  render () {
    return (
      <ThemeProvider uiTheme={Theme}>
        <RootNavigator />
      </ThemeProvider>
    )
  }
}
