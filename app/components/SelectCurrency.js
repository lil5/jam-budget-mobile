import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as NB from 'native-base'
import currencies from '../util/currencies.js'

export default class SelectCurrency extends Component {
  static propTypes = {
    defaultValue: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
  }

  render () {
    const { defaultValue, onChangeText } = this.props
    return (
      <NB.Item inlineLabel>
        <NB.Label style={{flex: 1}}>Currency</NB.Label>
        <NB.Picker
          style={{flex: 2}}
          iosHeader='Currency'
          placeholder='Currency'
          mode='dropdown'
          selectedValue={defaultValue}
          onValueChange={selectedCurrency => {
            onChangeText(selectedCurrency)
          }}
        >
          <NB.Item label='Default' value='' key='' />
          {currencies.map((currency, index) => (
            <NB.Item
              label={currency}
              value={currency}
              key={currency + index}
            />
          ))}
        </NB.Picker>
      </NB.Item>
    )
  }
}
