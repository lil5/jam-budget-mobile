import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native'
import { COLOR, Toolbar, RippleFeedback, Icon, IconToggle } from 'react-native-material-ui'

import StyleGlobals from '../styles/Globals'

export default class InputNumber extends Component {
  constructor (props) {
    super(props)
    this.state = {
      number: '',
      currency: '',
      type: '',
    }
  }

  static navigationOptions = { header: null, drawerLockMode: 'locked-closed' }
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  componentWillMount () {
    this.setState({
      number: '',
      currency: 'EUR',
      type: 'Expence',
    })
  }

  appendNumber (n) {
    const number = this.state.number

    // only add a '0' or '00' if number is larger that 0
    if (!((n === '0' || n === '00') && number.length === 0)) {
      this.setState({number: number + n})
    }
  }

  backspaceNumber () {
    const number = this.state.number
    if (number.length > 0) this.setState({number: number.slice(0, -1)})
  }
  clearNumber () { this.setState({number: ''}) }

  done () {
    // eslint-disable-next-line no-undef
    alert(`Done: ${this.state.number} ${(this.state.type === 'Expence') ? '-' : '+'}`)
  }

  visualizeNumber () {
    let visualized = this.state.number
    // add !npm react-currency-input
    return visualized
  }

  handleAddNumber (n) {
    this.setState({number: n})
  }

  render () {
    const styleInputText = {color: (this.state.type === 'Income') ? COLOR.green400 : COLOR.red400}
    return (
      <View style={[styles.InputContainer]}>
        <Toolbar
          leftElement='clear'
          onLeftElementPress={() => this.props.navigation.goBack()}
          centerElement='Add Transaction'
        />

        <View style={styles.InputTextContainer}>
          <Text
            style={styles.InputText}
          >
            <Text style={styleInputText}>
              {(this.state.type === 'Income') ? '+' : '-'}</Text>
            {this.visualizeNumber()}</Text>
        </View>

        <View style={[styles.NumpadNumbersRowContainer, styles.InputTypeContainer]}>
          <RippleFeedback onPress={() => this.setState({type: 'Expence'})} >
            <View style={[styles.InputType, styles.InputTypeRed]} >
              <Text style={[styles.TextBold, styles.InputTypeText]}>Expence</Text>
            </View>
          </RippleFeedback>
          <RippleFeedback onPress={() => this.setState({type: 'Income'})} >
            <View style={[styles.InputType, styles.InputTypeGreen]} >
              <Text style={[styles.InputTypeText]}>Income</Text>
            </View>
          </RippleFeedback>
        </View>

        <View style={styles.NumpadContainer}>
          <View style={styles.NumpadNumbersContainer}>
            {
              [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['0', '00']].map((buttonRow, index) => (
                <View key={index} style={styles.NumpadNumbersRowContainer}>
                  {buttonRow.map((buttonText) => (
                    <View key={buttonText} style={[
                      (buttonText === '00') ? {flex: 2} : {flex: 1},
                    ]}>
                      <TouchableWithoutFeedback onPress={() => this.appendNumber(buttonText)}>
                        <View style={styles.NumpadButton}>
                          <Text style={styles.NumpadButtonText}>{buttonText}</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  ))}
                </View>
              ))
            }
          </View>

          <View style={[ styles.NumpadNumbersRowContainer, styles.NumpadSubmitContainer ]}>
            <TouchableWithoutFeedback
              onPress={() => this.backspaceNumber()}
              onLongPress={() => this.clearNumber()}
            >
              <View style={styles.NumpadButton}>
                <Icon name='backspace' />
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.NumpadButton}>
              <View style={styles.NumpadDone}>
                <IconToggle
                  name='done'
                  color='white'
                  onPress={() => this.done()}
                />
              </View>
            </View>

          </View>

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  InputContainer: {
    flex: 1,
    backgroundColor: 'white',
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
    backgroundColor: COLOR.blueGrey50,
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
  NumpadButton: {
    flex: 1,
    ...StyleGlobals.Center,
  },
  NumpadButtonText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  // NumpadSubmit
  NumpadSubmitContainer: {
    flex: 1,
    flexDirection: 'column',
    ...StyleGlobals.Stretch,
    // ...StyleGlobals.Center,
  },
  // NumpadDone
  NumpadDoneContainer: {
  },
  NumpadDone: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLOR.teal400,
    ...StyleGlobals.Center,
  },
})
