import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {
  ActionButton,
  Icon,
  Toolbar,
} from 'react-native-material-ui'

// import StyleGlobals from '../styles/Globals'

const instructions = 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'

export default class App extends Component {

  static navigationOptions = { header: null, }

  render () {
    const { navigate } = this.props.navigation
    return (
      <View>
        <Toolbar
        leftElement='menu'
        centerElement='Envelope Budget'
        searchable={{
          autoFocus: true,
          placeholder: 'Search',
          onChangeText: value => this.setState({ searchText: value }),
          onSearchClosed: () => this.setState({ searchText: '' }),
        }}
        />
        <Text>
          Welcome to React Native!
        </Text>
        <Text>
          To get started, edit "app/compontents/App.js".
        </Text>
        <Text>
          {instructions}
        </Text>
        <ActionButton
          icon="edit"
          onPress={()=>navigate('InputNumber')}
        />
      </View>
    )
    // <InputNumber />
  }
}
