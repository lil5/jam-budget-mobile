import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { COLOR, Toolbar } from 'react-native-material-ui'

import StyleGlobals from '../styles/Globals'

import NumpadButton from './NumpadButton'

export default class InputNumber extends Component {
  constructor (props) {
    super(props)
    this.state = {
      number: '0',
      currency: '',
      type: '',
    }
  }

  static navigationOptions = { header: null }
  static propTypes = {
    navigation: PropTypes.isRequired,
  }

  componentWillMount () {
    this.setState({
      number: '0',
      currency: 'EUR',
      type: 'Expence',
    })
  }

  appendNumber (n) {
    this.setState({number: this.state.number + n})
  }

  backspaceNumber () {
    const number = this.state.number
    if (number.length > 1) this.setState({number: number.slice(0, -1)})
  }
  clearNumber () { this.setState({number: '0'}) }

  done () {
    // eslint-disable-next-line no-undef
    alert(`Done: ${parseInt(this.state.number)} ${(this.state.type === 'Expence') ? '-' : '+'}`)
  }

  visualizeNumber () {
    let visualized = parseInt(this.state.number)
    // add !npm react-currency-input
    return visualized
  }

  handleAddNumber (n) {
    this.setState({number: n})
  }

  render () {
    const renderNumpadButton = (n) => {
      // onPress={handleOnPress(text)}
      return (
        <TouchableOpacity
          onPress={() => this.appendNumber(n)}
          style={[
            styles.Stretch,
            (n === '00') ? {flex: 2} : {flex: 1},
          ]}
        >
          <NumpadButton
            type='text'
            text={n}
          />
        </TouchableOpacity>
      )
    }

    return (
      <View style={[styles.InputContainer]}>
        <Toolbar
          leftElement='arrow-back'
          onLeftElementPress={() => this.props.navigation.goBack()}
          centerElement='Add Transaction'
        />

        <Text style={styles.InputText}>{this.visualizeNumber()}</Text>

        <View style={[styles.NumpadNumbersRowContainer, styles.InputTypeContainer]}>
          <TouchableOpacity
            style={[styles.InputType, styles.InputTypeRed]}
            onPress={() => this.setState({type: 'Expence'})}
          >
            <Text style={[styles.TextBold, styles.InputTypeText]}>Expence</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({type: 'Income'})}
            style={[styles.InputType, styles.InputTypeGreen]}
          >
            <Text style={[styles.InputTypeText]}>Income</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.NumpadContainer}>

          <View style={styles.NumpadNumbersContainer}>
            <View style={styles.NumpadNumbersRowContainer}>
              {renderNumpadButton('1')}
              {renderNumpadButton('2')}
              {renderNumpadButton('3')}
            </View>
            <View style={styles.NumpadNumbersRowContainer}>
              {renderNumpadButton('4')}
              {renderNumpadButton('5')}
              {renderNumpadButton('6')}
            </View>
            <View style={styles.NumpadNumbersRowContainer}>
              {renderNumpadButton('7')}
              {renderNumpadButton('8')}
              {renderNumpadButton('9')}
            </View>
            <View style={styles.NumpadNumbersRowContainer}>
              {renderNumpadButton('0')}
              {renderNumpadButton('00')}
            </View>
          </View>

          <View style={[ styles.NumpadNumbersRowContainer, styles.NumpadSubmitContainer ]}>
            <TouchableOpacity
              onPress={() => this.backspaceNumber()}
              onLongPress={() => this.clearNumber()}
              style={styles.Stretch}
            >
              <NumpadButton type='icon' icon='backspace' />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.done()}
              style={styles.Stretch}
            >
              <NumpadButton type='icon' icon='done' />
            </TouchableOpacity>
          </View>

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  InputContainer: {
    flex: 2,
  },

  // InputText
  InputText: {
    flex: 2,
    padding: 50,
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 60,
  },

  // InputType
  InputTypeContainer: {
    flex: 1,
  },
  InputType: {
    ...StyleGlobals.Stretch,
    ...StyleGlobals.Center,
  },

  InputTypeRed: { backgroundColor: COLOR.red500 },
  InputTypeGreen: { backgroundColor: COLOR.green500 },
  InputTypeText: {
    fontSize: 30,
    color: COLOR.white,
    fontWeight: 'bold',
  },
  // Numpad
  NumpadContainer: {
    flex: 5,
    backgroundColor: COLOR.blueGrey100,
    flexDirection: 'row',
  },
  // NumpadNumbers
  NumpadNumbersContainer: {
    flex: 6,
  },
  NumpadNumbersRowContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  // NumpadSubmit
  NumpadSubmitContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  // Default
  ...StyleGlobals,
})
