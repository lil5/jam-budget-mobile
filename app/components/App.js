import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {
  ActionButton,
} from 'react-native-material-ui'

// import InputNumber from './InputNumber'

const instructions = 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'

export default class App extends Component {

  static navigationOptions = { title: 'Envelope Budget' }

  render () {
    const { navigate } = this.props.navigation
    return (
      <View>
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
