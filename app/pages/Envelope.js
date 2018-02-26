import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as NB from 'native-base'
import palette from '../palette'
import { updateEnvelope, deleteEnvelope } from '../redux/actions'
import PropTypes from 'prop-types'
import CurrencyFormatter from '../util/currency-formatter'
import Big from 'big.js'
import {
  Alert,
  ScrollView,
} from 'react-native'

class Envelope extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
      }).isRequired,
      staticContext: PropTypes.object,
    }).isRequired,
  }
  static propTypes = {
    // router url
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }),
    // redux store
    envelopes: PropTypes.arrayOf(PropTypes.shape({
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
    defaultCurrency: PropTypes.string,
    // redux actions
    updateEnvelope: PropTypes.func.isRequired,
    deleteEnvelope: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {}

    this.onPressDelete = this.onPressDelete.bind(this)
    this.onPressEdit = this.onPressEdit.bind(this)
  }

  componentWillMount () {
    const { id } = this.props.match.params
    const { envelopes } = this.props
    this.setState({
      envelope: envelopes.find(item => item.id === id),
    })
  }

  onPressDelete () {
    const { history } = this.context.router
    const { envelope } = this.state
    const { deleteEnvelope } = this.props

    Alert.alert(
      'Delete Envelope',
      'Are you sure you want to delete this envelope?\n' +
      '\nNote: this will not remove the transactions associated but will break their connection to an envelope.',
      [{text: 'Cancel', onPress: () => {}},
        {text: 'OK',
          onPress: () => {
            history.goBack()
            deleteEnvelope(envelope)
          }}],
    )
  }
  onPressEdit () {
    const { history } = this.context.router
    const { updateEnvelope } = this.props
    const { envelope } = this.state

    history.push(`/envelope/${envelope.id}/edit`, {
      title: `Edit ${envelope.name}`,
      onSubmit: el => updateEnvelope(el),
    })
  }

  render () {
    const { history } = this.context.router
    const { envelope } = this.state
    const { defaultCurrency } = this.props
    const thisCurrency = new CurrencyFormatter(
      defaultCurrency, envelope.currency)

    return (
      <NB.Container>
        <NB.Header>
          <NB.Left>
            <NB.Button transparent onPress={() => history.goBack()}>
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
          <NB.List style={{backgroundColor: palette.secondaryColor}}>

            <NB.ListItem>
              <NB.Col>
                <NB.H3 style={{color: 'white'}}>Amount</NB.H3>
              </NB.Col>
              <NB.Col style={{alignItems: 'flex-end'}}>
                <NB.H1 style={{color: 'white'}}>{thisCurrency.format(Big(envelope.amount).toString())}</NB.H1>
              </NB.Col>
            </NB.ListItem>

            <NB.ListItem>
              <NB.Col>
                <NB.H3 style={{color: 'white'}}>Costs</NB.H3>
              </NB.Col>
              <NB.Col style={{alignItems: 'flex-end'}}>
                <NB.H1 style={{color: 'white'}}>{thisCurrency.format(Big(envelope.burn).times(-1).toString())}</NB.H1>
              </NB.Col>
            </NB.ListItem>

            {envelope.goal.max > 0 && (
              <NB.ListItem>
                <NB.Col>
                  <NB.H3 style={{color: 'white'}}>Avalible</NB.H3>
                </NB.Col>
                <NB.Col style={{alignItems: 'flex-end'}}>
                  <NB.H1 style={{color: 'white'}}>
                    {thisCurrency.format(Big(envelope.burn).plus(envelope.goal.max).toString())}
                  </NB.H1>
                </NB.Col>
              </NB.ListItem>
            )}

            {envelope.goal.min > 0 && (
              <NB.ListItem>
                <NB.Col>
                  <NB.H3 style={{color: 'white'}}>To Collect</NB.H3>
                </NB.Col>
                <NB.Col style={{alignItems: 'flex-end'}}>
                  <NB.H1 style={{color: 'white'}}>{thisCurrency.format(Big(envelope.amount).minus(envelope.goal.min).times(-1).toString())}</NB.H1>
                </NB.Col>
              </NB.ListItem>
            )}

            <NB.ListItem>
              <NB.Grid>
                <NB.Col>
                  <NB.Text style={{color: 'white'}}>Saving {thisCurrency.format(envelope.goal.min)}</NB.Text>
                </NB.Col>
                <NB.Col>
                  <NB.Text style={{color: 'white'}}>Budget {thisCurrency.format(envelope.goal.max)}</NB.Text>
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
  }
}

const mapStateToProps = (state) => {
  return {
    envelopes: state.data,
    catagories: state.catagories,
    defaultCurrency: state.defaultCurrency,
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
