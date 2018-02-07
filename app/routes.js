import React from 'react'
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation'
import { Footer, FooterTab, Button, Icon, Text } from 'native-base'

import Envelopes from './pages/Envelopes'
import AddTransaction from './pages/AddTransaction'
import Envelope from './pages/Envelope'
import EnvelopeEdit from './pages/EnvelopeEdit'

export const RootNavigator = TabNavigator({
  Envelopes: { screen: StackNavigator({
    Envelopes: { screen: Envelopes },
    EnvelopeEdit: { screen: EnvelopeEdit },
    AddTransaction: { screen: AddTransaction },
    Envelope: { screen: Envelope },
  }, {initialRouteName: 'Envelopes'}) },
}, {
  initialRouteName: 'Envelopes',
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  /* eslint-disable react/prop-types */
  tabBarComponent: props => (
    <Footer>
      <FooterTab>
        <Button
          vertical
          active={props.navigation.state.index === 2}
          onPress={() => props.navigation.navigate('Envelopes')}>
          <Icon name='envelope-open' />
          <Text>Jade</Text>
        </Button>
        <Button
          vertical
          active
          onPress={() => props.navigation.dispatch(NavigationActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({ routeName: 'Envelopes' }),
              NavigationActions.navigate({
                routeName: 'AddTransaction',
                params: {},
              }),
            ],
          }))}>
          <Icon name='plus' style={{fontSize: 40}} />
        </Button>
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
      </FooterTab>
    </Footer>
  ),
  /* eslint-enable react/prop-types */
})
