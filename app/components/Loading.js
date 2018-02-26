import { Spinner, View } from 'native-base'
import palette from '../palette'
import React from 'react'

/**
 * Added a loading component for later use.
 */

export default props => (
  <View style={{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <Spinner color={palette.secondaryColor} />
  </View>
)
