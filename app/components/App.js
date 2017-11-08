import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {
  Toolbar,
} from 'react-native-material-ui'

const instructions = 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'

export default class App extends Component {
  render () {
    return (
      <View style={styles.instructions}>
        <Toolbar
          leftElement='menu'
          centerElement='Searchable'
          searchable={{
            autoFocus: false,
            placeholder: 'Search',
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
})
