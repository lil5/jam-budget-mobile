import React, { Component } from 'react'
import {
  TextInput,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types'
import { RippleFeedback } from 'react-native-material-ui'

import StyleGlobals from '../styles/Globals'

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
      <View>
        <TextInput
          returnKeyType='done'
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

        <View style={styles.BottomHover}>
          <RippleFeedback onPress={() => this.setState({...this.state, type: 'Expence'})} >
            <View style={[styles.InputType, styles.InputTypeRed]} >
              <Text style={[styles.TextBold, styles.InputTypeText]}>Expence</Text>
            </View>
          </RippleFeedback>
          <RippleFeedback onPress={() => this.setState({...this.state, type: 'Income'})} >
            <View style={[styles.InputType, styles.InputTypeGreen]} >
              <Text style={[styles.InputTypeText]}>Income</Text>
            </View>
          </RippleFeedback>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  BottomHover: {
    flexDirection: 'row',
    flex: 1,
  },
  // InputText
  InputTextContainer: {
    flex: 2,
    padding: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  InputText: {
    flex: 1,
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 55,
  },

  // InputType
  InputTypeContainer: {
    flex: 1,
  },
  InputType: {
    ...StyleGlobals.Stretch,
    ...StyleGlobals.Center,
  },
})
