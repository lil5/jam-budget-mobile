import React from 'react'
import { DrawerNavigator, StackNavigator } from 'react-navigation'

import DrawerCustom from './components/DrawerCustom'

import Envelopes from './containers/Envelopes'
import AddTransaction from './components/AddTransaction'
import Envelope from './containers/Envelope'
import EnvelopeEdit from './components/EnvelopeEdit'
import Accounts from './components/Accounts'
import Settings from './components/Settings'

export const RootNavigator = DrawerNavigator({
  Envelopes: { screen: StackNavigator({
    Envelopes: { screen: Envelopes },
    EnvelopeEdit: { screen: EnvelopeEdit },
    AddTransaction: { screen: AddTransaction },
    Envelope: { screen: Envelope },
  }, {initialRouteName: 'Envelopes'}) },
  Accounts: { screen: Accounts },
  Settings: { screen: Settings },
}, {
  initialRouteName: 'Envelopes',
  contentComponent: (props) => (<DrawerCustom {...props} />),
})
