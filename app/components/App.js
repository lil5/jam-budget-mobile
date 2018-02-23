import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native'
import { NativeRouter, Route, Link } from 'react-router-native'
import PropTypes from 'prop-types'

// router
import StateCounter from './StateCounter'

// import PouchDB from 'pouchdb-react-native'
// const localDB = new PouchDB('myDB')
const Note = (props) => {
  alert(JSON.stringify(props.match.params.text))
  return (<Text>st</Text>)
}

export default class App extends Component {
  static contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired
    }).isRequired,
    staticContext: PropTypes.object
  }).isRequired
};

  constructor (props) {
    super(props)

    this.onPressToNote = this.onPressToNote.bind(this)
    this.state = {
      toNote: '',
    }
  }

  onPressToNote () {
    this.context.router.history.push(`/note/${this.state.toNote}`)
    // alert(JSON.stringify(this.props))
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput value={this.state.toNote} onChangeText={value => this.setState({
            ...this.state,
            toNote: value,
          })} />
          <Button title='go' onPress={this.onPressToNote} />
        </View>
        <Route exact path='/' component={StateCounter} />
        <Route path='/note/:text' component={Note} />
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
