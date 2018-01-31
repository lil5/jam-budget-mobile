import React from 'react'
import { DrawerNavigator, StackNavigator, TabNavigator } from 'react-navigation'

import { Footer, FooterTab, Button, Icon, Text } from 'native-base'

// import DrawerCustom from './pages/DrawerCustom'
// import FooterTab from './components/FooterTabCustom'

import Envelopes from './pages/Envelopes'
import AddTransaction from './pages/AddTransaction'
import Envelope from './pages/Envelope'
import EnvelopeEdit from './pages/EnvelopeEdit'
import Accounts from './pages/Accounts'
import Settings from './pages/Settings'

export const RootNavigator = TabNavigator({
  Envelopes: { screen: StackNavigator({
    Envelopes: { screen: Envelopes },
  //   EnvelopeEdit: { screen: EnvelopeEdit },
  //   AddTransaction: { screen: AddTransaction },
  //   Envelope: { screen: Envelope },
  }, {initialRouteName: 'Envelopes'}) },
  Settings: { screen: Settings },
  Accounts: { screen: Accounts },
}, {
  initialRouteName: 'Envelopes',
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  tabBarComponent: props => (
    <Footer>
      <FooterTab>
        <Button
          vertical
          active={props.navigation.state.index === 0}
          onPress={() => props.navigation.navigate('Settings')}>
          <Icon name='user' />
          <Text>Lucy</Text>
        </Button>
        <Button
          vertical
          active={props.navigation.state.index === 1}
          onPress={() => props.navigation.navigate('Accounts')}>
          <Icon name='people' />
          <Text>Nine</Text>
        </Button>
        <Button
          vertical
          active={props.navigation.state.index === 2}
          onPress={() => props.navigation.navigate('Envelopes')}>
          <Icon name='envelope-open' />
          <Text>Jade</Text>
        </Button>
      </FooterTab>
    </Footer>
  ),
})
