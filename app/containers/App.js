import React, { Component } from 'react'
// import { StatusBar } from 'react-native'

// themes
import { ThemeProvider } from 'react-native-material-ui'
import Theme from '../styles/Theme'

// rn navigator
import { RootNavigator } from '../routes'

export default class extends Component {
  render () {
    // <StatusBar
    //   backgroundColor={COLOR.lightBlue400}
    //   barStyle='light-content'
    // />
    return (
      <ThemeProvider uiTheme={Theme}>
        <RootNavigator />
      </ThemeProvider>
    )
  }
}
