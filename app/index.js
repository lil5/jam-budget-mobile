import React, { Component } from 'react'

// redux
import { Provider } from 'react-redux'
import store from './store'

// themes
import { ThemeProvider } from 'react-native-material-ui'
import Theme from './styles/Theme'

// rn navigator
import { RootNavigator } from './routes'

export default class extends Component {
  render () {
    return (
      <Provider store={store}>
        <ThemeProvider uiTheme={Theme}>
          <RootNavigator />
        </ThemeProvider>
      </Provider>
    )
  }
}
