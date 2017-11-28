import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native'

export default class StateCounter extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    this.setState({
      counter: 1,
      text: 'State Counter',
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.onPressBtnAdd()} title='add' />
        <Button onPress={() => this.onPressBtnRemove()} title='remove' />
        <Text style={styles.instructions}>
          {this.state.text}
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
