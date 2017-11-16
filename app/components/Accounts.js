import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  SectionList,
  Text,
  ScrollView,
  View,
} from 'react-native'
import {
  Button,
  Card,
  Avatar,
  Icon,
  Toolbar,
  Subheader,
  COLOR,
  ListItem,
} from 'react-native-material-ui'

import StyleGlobals from '../styles/Globals'

export default class Accounts extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    this.setState({})
  }

  static navigationOptions = {
    header: null,
    drawerIcon: ({tintColor}) => (<Icon name='account-balance' color={tintColor} />),
  }
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
  static contextTypes = {
    uiTheme: PropTypes.object.isRequired,
  }

  render () {
    const { navigation } = this.props
    const { palette } = this.context.uiTheme

    return (
      <View style={[StyleGlobals.Stretch]}>
        <Toolbar
          leftElement='menu'
          onLeftElementPress={() => navigation.navigate('DrawerOpen')}
          centerElement='Accouts'
          rightElement='edit'
          onRightElementPress={() => alert(`foo`)}
        />

        <View style={styles.GoalsContainer}>
          <View style={[{backgroundColor: palette.accentColor}, styles.InfoContainer]}>
            <Text style={[
              styles.InfoTextSmall,
              {color: palette.alternateTextColor},
            ]}>per month</Text>
            <Text style={[
              {color: palette.alternateTextColor},
              styles.InfoText,
            ]}>€ 1000</Text>
          </View>
          <ScrollView style={styles.GoalsContainer}>
            <ListItem
              leftElement={(
                <Avatar icon='sync' />
              )}
              centerElement='hsetn'
            />
            <Text style={StyleGlobals.CardBody}>
            Going to catch the red dot today going to catch the red dot today lick butt and make a weird face. Make muffins lick arm hair meoooow stares at human while pushing stuff off a table and pee in humans bed until he cleans the litter box. Adventure always see owner, run in terror.
            </Text>
          </ScrollView>
        </View>

      </View>
    )
    // <InputNumber />
  }
}

const styles = StyleSheet.create({
})
