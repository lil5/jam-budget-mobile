import React, { Component } from 'react'

// redux
import { Provider } from 'react-redux'
import store from './store'

// themes rm-material-ui
import { ThemeProvider } from 'react-native-material-ui'
import Theme from './styles/Theme-old'

// theme nativebase
import { StyleProvider, Container } from 'native-base'
import getTheme from './native-base-theme/components'
import themePlatform from './native-base-theme/variables/platform'

// rn navigator
import { RootNavigator } from './routes'

export default class extends Component {
  render () {
    return (
      <Provider store={store}>
        <Container>
          <StyleProvider style={getTheme(themePlatform)}>
            <ThemeProvider uiTheme={Theme}>
              <RootNavigator />
            </ThemeProvider>
          </StyleProvider>
        </Container>
      </Provider>
    )
  }
}
