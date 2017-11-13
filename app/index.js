import React, { Component } from 'react'
import App from './components/App'
import InputNumber from './components/InputNumber'
import Envelope from './components/Envelope'

import { StackNavigator } from 'react-navigation'

import { ThemeProvider } from 'react-native-material-ui'
import Theme from './styles/Theme'

const RootNavigator = StackNavigator({
  Home: { screen: App },
  InputNumber: { screen: InputNumber },
  Envelope: { screen: Envelope },
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
