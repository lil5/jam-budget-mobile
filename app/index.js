import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import App from './components/App'
import InputNumber from './components/InputNumber'
import Envelope from './components/Envelope'
// import Accouts from './components/Accouts'

import DrawerCustom from './components/DrawerCustom'
import { DrawerNavigator, StackNavigator } from 'react-navigation'

import { ThemeProvider } from 'react-native-material-ui'
import Theme from './styles/Theme'

const RootNavigator = DrawerNavigator({
  Home: { screen: StackNavigator({
    Home: {screen: App},
    InputNumber: { screen: InputNumber },
    Envelope: { screen: Envelope },
  }, {initialRouteName: 'Home'}) },
  // Accouts: { screen: Accouts },
}, {
  initialRouteName: 'Home',
  contentComponent: (props) => (<DrawerCustom props={props} />),
})

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
