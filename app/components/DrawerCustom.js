import { Drawer, Avatar } from 'react-native-material-ui'
import { DrawerItems } from 'react-navigation'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class DrawerCustom extends Component {
  static contextTypes = {
    uiTheme: PropTypes.object.isRequired,
  }
  static propTypes = {
    props: PropTypes.object.isRequired,
  }

  render () {
    const { props } = this.props
    const { palette, drawerSectionActiveItem } = this.context.uiTheme
    return (
      <Drawer>
        <Drawer.Header>
          <Drawer.Header.Account
            avatar={<Avatar text={'A'} />}
            accounts={[
              { avatar: <Avatar text='B' /> },
              { avatar: <Avatar text='C' /> },
            ]}
            footer={{
              dense: true,
              centerElement: {
                primaryText: 'Reservio',
                secondaryText: 'business@email.com',
              },
              rightElement: 'arrow-drop-down',
            }}
          />
        </Drawer.Header>
        <DrawerItems {...props}
          activeTintColor={palette.primaryColor}
          activeBackgroundColor={drawerSectionActiveItem.container.backgroundColor}
          inactiveTintColor={palette.primaryTextColor}
          inactiveBackgroundColor={palette.canvasColor}
          itemStyle={{height: 48}}
        />
        <Drawer.Section
          divider
          items={[
            { icon: 'developer-board',
              value: 'Testing',
              onPress: () => {
                props.navigation.navigate('Home')
              }},
            { icon: 'today', value: 'Calendar', active: true },
            { icon: 'people', value: 'Clients' },
          ]}
        />
        <Drawer.Section
          title='Personal'
          items={[
            { icon: 'info', value: 'Info' },
            { icon: 'settings', value: 'Settings' },
          ]}
        />
      </Drawer>
    )
  }
}
