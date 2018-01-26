import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native'
import { COLOR, Toolbar } from 'react-native-material-ui'
import NumberInput from './NumberInput'
import Container from './Container'

export default class AddTransaction extends Component {
  static navigationOptions = { header: null, drawerLockMode: 'locked-closed' }
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
  static contextTypes = {
    uiTheme: PropTypes.object.isRequired,
  }

  componentWillMount () {
    this.setState({
      ...this.state,
      number: '-',
    })
  }

  render () {
    const { palette } = this.context.uiTheme
    const colorToolbar = (this.state.number < 0)
      ? COLOR.red400
      : (this.state.number > 0)
        ? COLOR.green400
        : palette.primaryColor

    return (
      <Container>
        <Toolbar
          style={{container: { backgroundColor: colorToolbar }}}
          leftElement='clear'
          onLeftElementPress={() => this.props.navigation.goBack()}
          centerElement={'Add ' + ((this.state.number < 0)
            ? 'Expence'
            : (this.state.number > 0)
              ? 'Income'
              : 'Transaction')}
        />

        <NumberInput
          style={{fontSize: 90, margin: 15}}
          autoFocus
          selectTextOnFocus={false}
          onChangeText={str => this.setState({number: str})}
          defaultValue={this.state.number}
          onSubmitEditing={() => Alert.alert(this.state.number)}
        />

      </Container>
    )
  }
}
