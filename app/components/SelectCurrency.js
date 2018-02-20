import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as NB from 'native-base'
import currencies from '../util/currencies.js'

export default class SelectCurrency extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedCurrency: props.currency,
    }
  }

  static propTypes = {
    currency: PropTypes.string,
    onChangeText: PropTypes.func,
  }

  static defaultProps = {
    currency: '',
  }

  render () {
    return (
      <NB.Item inlineLabel>
        <NB.Label style={{flex: 1}}>Currency</NB.Label>
        <NB.Picker
          style={{flex: 2}}
          iosHeader='Currency'
          placeholder='Currency'
          mode='dropdown'
          selectedValue={this.state.selectedCurrency}
          onValueChange={selectedCurrency => {
            this.setState({
              ...this.state,
              selectedCurrency,
            })
            this.props.onChangeText(selectedCurrency)
          }}
        >
          <NB.Item label='---' value='' key='' />
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
