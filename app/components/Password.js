import React, { Component } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  Button,
} from 'react-native'

// redux
import PropTypes from 'prop-types'

class Password extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  render () {
    return (
      <View>
        <TextInput
          onSubmitEditing={() => this.props.onSubmit(this.state.password)}
          onChangeText={(password) => this.setState({...this.state, password})}
        />
        <Button
          onPress={() => this.props.onSubmit(this.state.password)}
          title='Submit'
        />
      </View>
    )
  }
}

export default Password
