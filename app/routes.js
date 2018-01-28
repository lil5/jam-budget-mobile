import React from 'react'
import { DrawerNavigator, StackNavigator } from 'react-navigation'

import DrawerCustom from './pages/DrawerCustom'

import Envelopes from './pages/Envelopes'
import AddTransaction from './pages/AddTransaction'
import Envelope from './pages/Envelope'
import EnvelopeEdit from './pages/EnvelopeEdit'
import Accounts from './pages/Accounts'
import Settings from './pages/Settings'

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
