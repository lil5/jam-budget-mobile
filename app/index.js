import React, { Component } from 'react'
import App from './components/App'
import InputNumber from './components/InputNumber'
import Envelope from './components/Envelope'

import DrawerCustom from './components/DrawerCustom'
import { DrawerNavigator, DrawerItems } from 'react-navigation'

import { ThemeProvider } from 'react-native-material-ui'
import Theme from './styles/Theme'

const RootNavigator = DrawerNavigator({
  Home: { screen: App },
  InputNumber: { screen: InputNumber },
  Envelope: { screen: Envelope },
}, {
  contentComponent: (props) => (<DrawerCustom props={props} />),
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
