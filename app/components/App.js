import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native'
// import PouchDB from 'pouchdb-react-native'
// const localDB = new PouchDB('myDB')

const instructions = 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    this.setState({
      counter: 1,
    })
  }
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit "app/compontents/App.js".
        </Text>
        <Button onPress={() => this.onPressBtnAdd()} title='add' />
        <Button onPress={() => this.onPressBtnRemove()} title='remove' />
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <Text style={styles.instructions}>
          {this.state.counter}
        </Text>
      </View>
    )
  }

  onPressBtnAdd () {
    this.setState({
      counter: ++this.state.counter,
    })
  }

  onPressBtnRemove () {
    this.setState({
      counter: --this.state.counter,
    })
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
