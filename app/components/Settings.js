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

export default class Settings extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    this.setState({})
  }

  static navigationOptions = {
    header: null,
    drawerIcon: ({tintColor}) => (<Icon name='settings' color={tintColor} />),
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
          leftElement='arrow-back'
          onLeftElementPress={() => navigation.navigate('Home')}
          centerElement='Settings'
        />

      </View>
    )
    // <InputNumber />
  }
}
// <ScrollView style={styles.GoalsContainer}>
// <ListItem
// leftElement={(
//   <Avatar icon='sync' />
// )}
// centerElement='hsetn'
// />
// </ScrollView>

const styles = StyleSheet.create({
})
