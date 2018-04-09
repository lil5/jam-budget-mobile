import { Footer, FooterTab, Button, Icon, Text } from 'native-base'
import React from 'react'
import { Alert } from 'react-native'
import { matchPath } from 'react-router-native'
import palette from '../palette'

/* eslint-disable react/prop-types */
export default function ({ history }) {
  return (
    <Footer>
      <FooterTab>
        <Button
          vertical
          active={matchPath(history.location.pathname, {
            path: '/',
            exact: true,
          }) !== null}
          onPress={() => history.go((history.length - 1) * -1)}>
          <Icon name='drawer' />
          <Text>Jars</Text>
        </Button>
        <Button
          vertical
          onPress={() => history.push('/add', {isMinus: false})}>
          <Icon style={{color: palette.success}} name='plus' />
          <Text style={{color: palette.success}} >Add</Text>
        </Button>
        <Button
          vertical
          active={matchPath(history.location.pathname, {
            path: '/stats',
          }) !== null}
          onPress={() => history.push('/stats')}>
          <Icon name='graph' />
          <Text>Stats</Text>
        </Button>
        <Button
          vertical
          active={matchPath(history.location.pathname, {
            path: '/settings',
          }) !== null}
          onPress={() => history.push('/settings')}>
          <Icon name='settings' />
          <Text>Settings</Text>
        </Button>
      </FooterTab>
    </Footer>
  )
}
