import React from 'react'
import { DrawerNavigator, StackNavigator } from 'react-navigation'

import DrawerCustom from './components/DrawerCustom'

import Envelopes from './containers/Envelopes'
import InputNumber from './components/InputNumber'
import Envelope from './components/Envelope'
import EnvelopeEdit from './components/EnvelopeEdit'
import Accounts from './components/Accounts'
import Settings from './components/Settings'

export const RootNavigator = DrawerNavigator({
  Envelopes: { screen: StackNavigator({
    Envelopes: { screen: Envelopes },
    EnvelopeEdit: { screen: EnvelopeEdit },
    InputNumber: { screen: InputNumber },
    Envelope: { screen: Envelope },
  }, {initialRouteName: 'Envelopes'}) },
  Accounts: { screen: Accounts },
  Settings: { screen: Settings },
}, {
  initialRouteName: 'Envelopes',
  contentComponent: (props) => (<DrawerCustom {...props} />),
})
