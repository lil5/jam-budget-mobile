import React, { Component } from 'react'
import { StatusBar } from 'react-native'

// themes
import { ThemeProvider } from 'react-native-material-ui'
import Theme from './styles/Theme'

// rn navigator
import { RootNavigator } from './routes'

// redux
import { Provider } from 'react-redux'
import store from './store'

export default class extends Component {
  render () {
    return (
      <Provider store={store}>
        <ThemeProvider uiTheme={Theme}>
          <StatusBar
            backgroundColor={Theme.palette.primaryColor}
            barStyle='light-content'
          />
          <RootNavigator />
        </ThemeProvider>
      </Provider>
    )
  }
}
