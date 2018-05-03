// import Expo from 'exp'
import React from 'react'
import Files from '../../Files'
import {
  Image,
  View,
} from 'react-native'

/* eslint-disable react/prop-types */
export default function ({ n }) {
  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Image
        source={Files.images.jar_amount[n]}
        style={{
          width: 316,
          height: 316,
          flex: 1,
        }}
      />
    </View>
  )
}
