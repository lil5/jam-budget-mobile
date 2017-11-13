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

export default class Envelope extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount () {
    this.setState({})
  }

  static navigationOptions = { header: null }
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    // title: PropTypes.string.isRequired,
  }
  static contextTypes = {
    uiTheme: PropTypes.object.isRequired,
  }

  render () {
    const { navigation } = this.props
    const { palette } = this.context.uiTheme

    // will add color status
    const getGoalsAvatarColor = () => {
      return {backgroundColor: palette.primaryColor}
    }

    return (
      <View style={[styles.EnvelopeContainer, StyleGlobals.Stretch]}>
        <Toolbar
          leftElement='arrow-back'
          onLeftElementPress={() => navigation.goBack()}
          centerElement={navigation.state.params.title}
          rightElement={{
            actions: [
              'label',
            ],
            menu: { labels: ['Rename', 'Delete'] },
          }}
          onRightElementPress={(e) => alert(`foo i:${e.index} a:${e.action} res:${e.result}`)}
        />

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

        <View style={styles.GoalsContainer}>
          <ScrollView style={styles.GoalsContainer}>
            <Card>
              <ListItem
                leftElement={(
                  <Avatar style={{container: {
                    ...getGoalsAvatarColor(),
                    ...StyleGlobals.AvatarSmallContainer,
                  }}} icon='sync' />
                )}
                centerElement='hsetn'
              />
              <Text style={StyleGlobals.CardBody}>
            Going to catch the red dot today going to catch the red dot today lick butt and make a weird face. Make muffins lick arm hair meoooow stares at human while pushing stuff off a table and pee in humans bed until he cleans the litter box. Adventure always see owner, run in terror.
              </Text>
            </Card>
          </ScrollView>
        </View>

      </View>
    )
    // <InputNumber />
  }
}

const styles = StyleSheet.create({
  EnvelopeContainer: {
    flex: 1,
  },
  InfoContainer: {
    height: 90,
    ...StyleGlobals.Center,
  },
  InfoText: {
    fontSize: 33,

  },
  InfoTextSmall: {
    // backgroundColor: Envelope.context.uiTheme.palette.alternateTextColor,
  },
  GoalsContainer: {
    flex: 5,
  },
})
