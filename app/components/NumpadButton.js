import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { COLOR, Icon } from 'react-native-material-ui'

import StyleGlobals from '../styles/Globals'

export default class NubpadButton extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      type,
      style,
      text,
      icon,
    } = this.props

    switch (type) {
      case 'icon':
        return (
          <View
            style={[style, styles.NumpadButton]}
          >
            <Icon
              name={icon}
              color={COLOR.black}
            />
          </View>
        )
        break
      case 'text':
        return (
          <View style={[style, styles.NumpadButton]}
          >
            <Text style={styles.NumpadButtonText}>{text}</Text>
          </View>
        )
        break
    }
  }
}

NubpadButton.defaultProps = {
  type: 'text',
  style: {flex: 1},
  text: 'Text',
  icon: '',
}

const styles = StyleSheet.create({
  NumpadButton: {
    flex: 1,
    ...StyleGlobals.Center,
  },
  NumpadButtonText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  ...StyleGlobals,
})
