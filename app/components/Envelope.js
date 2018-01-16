import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createEnvelope, updateEnvelope, deleteEnvelope } from '../actions/envelopes'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Alert,
  Text,
  ScrollView,
  View,
} from 'react-native'
import {
  Card,
  Avatar,
  Toolbar,
  ListItem,
} from 'react-native-material-ui'

import StyleGlobals from '../styles/Globals'

class Envelope extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    const id = this.props.navigation.state.params.envelopeId
    const { envelopes } = this.props
    this.setState({
      envelope: envelopes.data.find(e => e.id === id),
    })
  }

  static navigationOptions = { header: null, drawerLockMode: 'locked-closed' }
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    // redux store
    envelopes: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        catId: PropTypes.string,
        desc: PropTypes.string,
        amount: PropTypes.number,
        goal: PropTypes.object,
      })),
      catagories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })),
    }),
    // redux actions
    createEnvelope: PropTypes.func.isRequired,
    updateEnvelope: PropTypes.func.isRequired,
    deleteEnvelope: PropTypes.func.isRequired,
  }
  static contextTypes = {
    uiTheme: PropTypes.object.isRequired,
  }

  onPressSettings (e) {
    const { navigation, envelopes } = this.props
    const { envelope } = this.state

    if (e.action === 'menu') {
      switch (e.index) {
        case 0:
          navigation.navigate('EnvelopeEdit', {
            title: `Edit ${envelope.name}`,
            onSubmit: el => this.props.updateEnvelope(el),
            catagories: envelopes.catagories,
            envelope: envelope,
          })
          break
        case 1:
          Alert.alert(
            'Delete Envelope',
            'Are you sure you want to delete this envelope?\n' +
            '\nNote: this will not remove the transactions associated but will break their connection to an envelope.',
            [{text: 'Cancel', onPress: () => {}},
              {text: 'OK',
                onPress: () => {
                  navigation.goBack()
                  this.props.deleteEnvelope(envelope)
                }}],
          )
          break
      }
    }
  }

  render () {
    const { navigation } = this.props
    const { envelope } = this.state
    const { palette } = this.context.uiTheme

    // will add color status
    const getGoalAvatarColor = () => {
      return {backgroundColor: palette.primaryColor}
    }

    //  Alert.alert(`foo i:${e.index} a:${e.action} res:${e.result}`)}
    return (
      <View style={[styles.EnvelopeContainer, StyleGlobals.Stretch]}>
        <Toolbar
          leftElement='arrow-back'
          onLeftElementPress={() => navigation.goBack()}
          centerElement={envelope.name}
          rightElement={{
            menu: { labels: ['Edit', 'Delete'] },
          }}
          onRightElementPress={(e) => this.onPressSettings(e)}
        />

        <View style={[{backgroundColor: palette.accentColor}, styles.InfoContainer]}>
          <Text style={[
            styles.InfoTextSmall,
            {color: palette.alternateTextColor},
          ]}>per month</Text>
          <Text style={[
            {color: palette.alternateTextColor},
            styles.InfoText,
          ]}>€ {envelope.amount}</Text>
        </View>

        <View style={styles.GoalContainer}>
          <ScrollView style={styles.GoalContainer}>
            <Card>
              <ListItem
                leftElement={(
                  <Avatar style={{container: {
                    ...getGoalAvatarColor(),
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
  GoalContainer: {
    flex: 5,
  },
})

const mapStateToProps = (state) => {
  return {
    envelopes: state.envelopes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createEnvelope: (e) => {
      dispatch(createEnvelope(e))
    },
    updateEnvelope: (e) => {
      dispatch(updateEnvelope(e))
    },
    deleteEnvelope: (id) => {
      dispatch(deleteEnvelope(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Envelope)
