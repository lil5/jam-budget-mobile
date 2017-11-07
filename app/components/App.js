import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

const instructions = 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'

export default class App extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit "app/compontents/App.js".
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})
