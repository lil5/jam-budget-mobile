import { Drawer, Avatar } from 'react-native-material-ui'
import { DrawerItems } from 'react-navigation'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class DrawerCustom extends Component {
  static contextTypes = {
    uiTheme: PropTypes.object.isRequired,
  }

  // https://github.com/react-community/react-navigation/blob/e25bdd2ed2fcee5e9e811ab225a3741ec7b75ca3/src/views/Drawer/DrawerNavigatorItems.js#L18
  static propTypes = {
    navigation: PropTypes.object.isRequired, // NavigationScreenProp<NavigationState>,
    items: PropTypes.array.isRequired, // Array<NavigationRoute>,
    activeItemKey: PropTypes.string,
    activeTintColor: PropTypes.string,
    activeBackgroundColor: PropTypes.string,
    inactiveTintColor: PropTypes.string,
    inactiveBackgroundColor: PropTypes.string,
    getLabel: PropTypes.func.isRequired, // scene: DrawerScene) => ?(React.Node | string),
    renderIcon: PropTypes.func.isRequired, // scene: DrawerScene) => ?React.Node,
    onItemPress: PropTypes.func.isRequired, // info: DrawerItem) => void,
    itemsContainerForceInset: PropTypes.object,
    itemsContainerStyle: PropTypes.object, // ViewStyleProp,
    itemStyle: PropTypes.object, // ViewStyleProp,
    labelStyle: PropTypes.object, // TextStyleProp,
    iconContainerStyle: PropTypes.object, // ViewStyleProp,
    drawerPosition: PropTypes.oneOf(['left' | 'right']).isRequired,
  }

  onItemPress (route, focused) {
    const { navigation } = this.props

    navigation.navigate('DrawerClose')
    navigation.navigate(route.routeName)
  }

  render () {
    const {
      items,
      activeItemKey,
      getLabel,
      renderIcon,
    } = this.props

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
        <DrawerItems {...this.props}
          activeTintColor={palette.primaryColor}
          activeBackgroundColor={drawerSectionActiveItem.container.backgroundColor}
          inactiveTintColor={palette.primaryTextColor}
          inactiveBackgroundColor={palette.canvasColor}
          itemStyle={{height: 48}}
        />
        <Drawer.Section
          divider
          items={items.map((route, index) => {
            const focused = activeItemKey === route.key
            const tintColor = focused ? palette.primaryColor : palette.secondaryTextColor
            const scene = { route, index, focused, tintColor }
            const icon = renderIcon(scene)
            const label = getLabel(scene)
            return {
              active: focused,
              value: label,
              icon,
              key: route.key,
              onPress: () => this.onItemPress(route, focused),
            }
          })}
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
