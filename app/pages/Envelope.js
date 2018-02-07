import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as NB from 'native-base'
import { updateEnvelope, deleteEnvelope } from '../actions/envelopes'
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

    this.onPressDelete = this.onPressDelete.bind(this)
    this.onPressEdit = this.onPressEdit.bind(this)
  }

  componentWillMount () {
    const id = this.props.navigation.state.params.envelopeId
    const { envelopes } = this.props
    this.setState({
      envelope: envelopes.data.find(e => e.id === id),
    })
  }

  static navigationOptions = { header: null }
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
        burn: PropTypes.number,
        goal: PropTypes.object,
      })),
      catagories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })),
    }),
    // redux actions
    updateEnvelope: PropTypes.func.isRequired,
    deleteEnvelope: PropTypes.func.isRequired,
  }
  static contextTypes = {
    uiTheme: PropTypes.object.isRequired,
  }
  onPressDelete () {
    const { navigation } = this.props
    const { envelope } = this.state

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
  }
  onPressEdit () {
    const { navigation, envelopes } = this.props
    const { envelope } = this.state

    navigation.navigate('EnvelopeEdit', {
      title: `Edit ${envelope.name}`,
      onSubmit: el => this.props.updateEnvelope(el),
      catagories: envelopes.catagories,
      envelope: envelope,
    })
  }

  render () {
    const { navigation } = this.props
    const { envelope } = this.state
    const { palette } = this.context.uiTheme

    return (
      <NB.Container>
        <NB.Header>
          <NB.Left>
            <NB.Button transparent onPress={() => navigation.goBack()}>
              <NB.Icon name='arrow-left' />
            </NB.Button>
          </NB.Left>
          <NB.Body>
            <NB.Title>{envelope.name}</NB.Title>
          </NB.Body>
          <NB.Right>
            <NB.Button transparent
              onPress={this.onPressDelete}
            >
              <NB.Icon name='trash' />
            </NB.Button>
            <NB.Button transparent
              onPress={this.onPressEdit}>
              <NB.Icon name='pencil' />
            </NB.Button>
          </NB.Right>
        </NB.Header>

        <NB.Content>
          <NB.List style={{backgroundColor: palette.accentColor}}>

            <NB.ListItem>
              <NB.Col>
                <NB.H3 style={{color: 'white'}}>Amount</NB.H3>
              </NB.Col>
              <NB.Col style={{alignItems: 'flex-end'}}>
                <NB.H1 style={{color: 'white'}}>{'€ ' + envelope.amount}</NB.H1>
              </NB.Col>
            </NB.ListItem>

            <NB.ListItem>
              <NB.Col>
                <NB.H3 style={{color: 'white'}}>Costs</NB.H3>
              </NB.Col>
              <NB.Col style={{alignItems: 'flex-end'}}>
                <NB.H1 style={{color: 'white'}}>{'€ ' + envelope.burn * -1}</NB.H1>
              </NB.Col>
            </NB.ListItem>

            {envelope.goal.max > 0 && (
              <NB.ListItem>
                <NB.Col>
                  <NB.H3 style={{color: 'white'}}>Avalible</NB.H3>
                </NB.Col>
                <NB.Col style={{alignItems: 'flex-end'}}>
                  <NB.H1 style={{color: 'white'}}>{'€ ' + (envelope.burn + envelope.goal.max)}</NB.H1>
                </NB.Col>
              </NB.ListItem>
            )}

            {envelope.goal.min > 0 && (
              <NB.ListItem>
                <NB.Col>
                  <NB.H3 style={{color: 'white'}}>To Collect</NB.H3>
                </NB.Col>
                <NB.Col style={{alignItems: 'flex-end'}}>
                  <NB.H1 style={{color: 'white'}}>{'€ ' + -1 * (envelope.amount - envelope.goal.min)}</NB.H1>
                </NB.Col>
              </NB.ListItem>
            )}

            <NB.ListItem>
              <NB.Grid>
                <NB.Col>
                  <NB.H3 style={{color: 'white'}}>Saving</NB.H3>
                </NB.Col>
                <NB.Col style={{alignItems: 'flex-end'}}>
                  <NB.H3 style={{color: 'white'}}>{'€ ' + envelope.goal.min}</NB.H3>
                </NB.Col>
                <NB.Col />
                <NB.Col>
                  <NB.H3 style={{color: 'white'}}>Budget</NB.H3>
                </NB.Col>
                <NB.Col style={{alignItems: 'flex-end'}}>
                  <NB.H3 style={{color: 'white'}}>{'€ ' + envelope.goal.max}</NB.H3>
                </NB.Col>
              </NB.Grid>
            </NB.ListItem>

          </NB.List>

          <ScrollView>
            { envelope.desc.length > 0 &&
            <NB.Card transparent>
              <NB.CardItem header>
                <NB.Icon name='info' />
                <NB.H3>Notes</NB.H3>
              </NB.CardItem>
              <NB.CardItem>
                <NB.Body>
                  <NB.Text>{envelope.desc}</NB.Text>
                </NB.Body>
              </NB.CardItem>
            </NB.Card>}
          </ScrollView>
        </NB.Content>

      </NB.Container>
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
    updateEnvelope: (e) => {
      dispatch(updateEnvelope(e))
    },
    deleteEnvelope: (id) => {
      dispatch(deleteEnvelope(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Envelope)
