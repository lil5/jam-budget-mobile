import React, { Component } from 'react'
import { StatusBar } from 'react-native'

import { ThemeProvider } from 'react-native-material-ui'
import Theme from './styles/Theme'

import { RootNavigator } from './routes'

export default class extends Component {
  render () {
    return (
      <ThemeProvider uiTheme={Theme}>
        <StatusBar
          backgroundColor={Theme.palette.primaryColor}
          barStyle='light-content'
        />
        <RootNavigator />
      </ThemeProvider>
    )
  }
}
