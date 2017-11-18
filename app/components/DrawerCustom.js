import { Drawer, Divider, Avatar } from 'react-native-material-ui'
import React, { Component } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
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
    drawerPosition: PropTypes.oneOf(['left' | 'right']),
  }

  onItemPress (route, focused) {
    const { navigation } = this.props

    navigation.navigate('DrawerClose')
    navigation.navigate(route.routeName)
  }

  renderDrawerSection (list) {
    const {
      activeItemKey,
      getLabel,
      renderIcon,
    } = this.props
    const { palette } = this.context.uiTheme

    return (
      <Drawer.Section
        items={list.map((route, index) => {
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
    )
  }

  render () {
    const { items } = this.props

    const sliceIndex = 2
    const topList = items.slice(0, sliceIndex)
    const bottomList = items.slice(sliceIndex)

    return (
      <View style={styles.DrawerContainer}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
          <View style={styles.TopList}>
            {this.renderDrawerSection(topList)}
          </View>
          <View style={styles.BottomList}>
            <Divider />
            {this.renderDrawerSection(bottomList)}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  DrawerContainer: {
    flex: 1,
  },
  TopList: {
    flex: 1,
  },
  BottomList: {
  },
})
