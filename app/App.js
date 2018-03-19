import React, { Component } from 'react'

// redux
import { Provider } from 'react-redux'
import store from './store'
import { updateRedux } from './redux/actions'

// theme nativebase
import { StyleProvider } from 'native-base'
import getTheme from './native-base-theme/components'
import theme from './native-base-theme/variables/theme'

// router
import Routes from './Routes'

export default class App extends Component {
  constructor (props) {
    super(props)

    store.dispatch(updateRedux())
  }

  render () {
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(theme)}>
          <Routes />
        </StyleProvider>
      </Provider>
    )
  }
}
