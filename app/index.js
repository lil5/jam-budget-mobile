import React, { Component } from 'react'

// redux
import { Provider } from 'react-redux'
import store from './store'

// theme nativebase
import { StyleProvider } from 'native-base'
import getTheme from './native-base-theme/components'
import theme from './native-base-theme/variables/theme'

// rn navigator
import { RootNavigator } from './routes'

export default class extends Component {
  render () {
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(theme)}>
          <RootNavigator />
        </StyleProvider>
      </Provider>
    )
  }
}
