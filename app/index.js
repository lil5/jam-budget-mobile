import React, { Component } from 'react'
import Password from './components/Password'
import { View, StyleSheet } from 'react-native'

// redux
import { Provider } from 'react-redux'
import store from './store'

import App from './components/App'

export default class extends Component {
  componentWillMount () {
    this.setState({
      ...this.state,
      password: false,
    })
  }

  render () {
    const { password } = this.state
    return (
      <View style={{flex: 1}}>
        {(password !== false) && this.renderApp()}
        {(password === false) && this.renderPassword()}
      </View>
    )
  }

  renderPassword () {
    return (<Password onSubmit={p => this.setState({...this.state, password: p})} />)
  }

  renderApp () {
    // return <App />
    return (
      <Provider store={store(this.state.password)}>
        <App />
      </Provider>
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
