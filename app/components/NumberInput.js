import React, { Component } from 'react'
import { TextInput } from 'react-native'
import PropTypes from 'prop-types'

export default class NumberInput extends Component {
  static contextTypes = {
    uiTheme: PropTypes.object.isRequired,
  }

  static propTypes = {
    onChangeText: PropTypes.func.isRequired,
    style: PropTypes.object,
    selectTextOnFocus: PropTypes.bool,
    autoFocus: PropTypes.bool,
    defaultValue: PropTypes.string,
  }

  static defaultProps = {
    defaultValue: '',
    selectTextOnFocus: true,
    autoFocus: false,
    style: {},
  }

  componentWillMount () {
    this.setState({...this.state,
      number: this.props.defaultValue,
      props: { ...this.props },
    })
  }

  render () {
    // const { palette } = this.context.uiTheme
    const { number, props } = this.state

    return (
      <TextInput
        returnKeyType='next'
        selectTextOnFocus={props.selectTextOnFocus}
        autoFocus={props.autoFocus}
        style={[{
          textAlign: 'right',
          margin: 5,
        }, props.style]}
        keyboardType='numeric'
        value={number}
        onChangeText={str => {
          if (!isNaN(str) || str === '-') {
            this.props.onChangeText(str)
            this.setState({...this.state, number: str})
          }
        }}
      />
    )
  }
}
