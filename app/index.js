import React, { Component } from 'react'
import App from './components/App'
import { NativeRouter, BackButton } from 'react-router-native'

export default class extends Component {
  render () {
    return (

      <NativeRouter>
        <BackButton>
          <App />
        </BackButton>
      </NativeRouter>
    )
  }
}
