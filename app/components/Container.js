import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'

class Container extends Component {
  static contextTypes = {
    uiTheme: PropTypes.object.isRequired,
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render () {
    const { palette } = this.context.uiTheme

    return (
      <View style={{
        flex: 1,
        backgroundColor: palette.canvasColor,
      }}>
        {this.props.children}
      </View>
    )
  }
}

export default Container
