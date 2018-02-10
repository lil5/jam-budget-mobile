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
  // Stats
  // Settings or Sync to NextCloud
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
          active={props.navigation.state.index === 0}
          onPress={() => props.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [ NavigationActions.navigate({ routeName: 'Envelopes' }) ],
          }))}>
          <Icon name='envelope-open' />
          <Text>Home</Text>
        </Button>
        <Button
          vertical
          active={props.navigation.state.index === 1}
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
          <Icon name='plus' />
          <Text>Add</Text>
        </Button>
        <Button
          vertical
          active={props.navigation.state.index === 2}
          onPress={() => props.navigation.navigate('Stats')}>
          <Icon name='graph' />
          <Text>Stats</Text>
        </Button>
        <Button
          vertical
          active={props.navigation.state.index === 3}
          onPress={() => props.navigation.navigate('Settings')}>
          <Icon name='settings' />
          <Text>Settings</Text>
        </Button>
      </FooterTab>
    </Footer>
  ),
  /* eslint-enable react/prop-types */
})
