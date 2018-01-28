import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import {
  Icon,
  Toolbar,
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
    drawerIcon: 'settings',
  }
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }
  static contextTypes = {
    uiTheme: PropTypes.object.isRequired,
  }

  render () {
    const { navigation } = this.props

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
// <ScrollView style={styles.GoalContainer}>
// <ListItem
// leftElement={(
//   <Avatar icon='sync' />
// )}
// centerElement='hsetn'
// />
// </ScrollView>

const styles = StyleSheet.create({
})
