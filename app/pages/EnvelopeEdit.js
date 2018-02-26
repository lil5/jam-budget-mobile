import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import * as NB from 'native-base'

import uniqueId from 'lodash.uniqueid'
import NumberInput from '../components/NumberInput'
import SelectCurrency from '../components/SelectCurrency'

class EnvelopeEdit extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
        location: PropTypes.shape({
          state: PropTypes.shape({
            title: PropTypes.string.isRequired,
            onSubmit: PropTypes.func.isRequired,
          }),
        }),
      }).isRequired,
      staticContext: PropTypes.object,
    }).isRequired,
  }
  static propTypes = {
    // router url
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
    // redux store
    envelopes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      catId: PropTypes.string,
      desc: PropTypes.string,
      amount: PropTypes.number,
      goal: PropTypes.object,
      currency: PropTypes.string,
      repeat: PropTypes.string,
    })),
    catagories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }

  constructor (props) {
    super(props)

    // binds
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onPressResetAmount = this.onPressResetAmount.bind(this)

    this.state = {}
  }

  componentWillMount () {
    const id = this.props.match.params.id
    const { catagories, envelopes } = this.props

    const defaultNewEnvelope = {
      name: '',
      desc: '',
      catId: 'living_expences',
      amount: 0,
      burn: 0,
      goal: {min: 0, max: 0},
      currency: '',
      repeat: '',
    }

    const isNew = id === undefined

    this.setState({
      ...this.state,
      isNew,
      catagories,
      envelope: isNew ? defaultNewEnvelope : envelopes.find(item => item.id === id),
    })
  }

  handleSubmit () {
    const { history } = this.context.router
    const { onSubmit } = history.location.state
    const { envelope } = this.state

    // check values
    if (envelope.name.length === 0) {
      Alert.alert('Name too short')
    } else if (!envelope.catId) {
      Alert.alert('No catagory selected')
    } else if (envelope.repeat !== '' && envelope.currency !== '') {
      Alert.alert('Impossible selected', 'Can not have a repeating envelope with a non default currency')
    } else {
      history.goBack()

      const {
        name,
        desc,
        catId,
        amount,
        burn,
        goal,
        currency,
        repeat,
      } = envelope

      // add id
      const id = !envelope.id
        ? uniqueId(name.toLowerCase())
        : envelope.id

      onSubmit({
        id,
        name,
        desc,
        catId,
        amount,
        burn,
        goal,
        currency,
        repeat,
      })
    }
  }

  onChangeText (el, value) {
    this.setState({
      ...this.state,
      envelope: {
        ...this.state.envelope,
        [el]: value,
      },
    })
  }

  onPressResetAmount () {
    this.setState({
      ...this.state,
      envelope: {
        ...this.state.envelope,
        amount: 0,
        burn: 0,
      },
    })
  }

  render () {
    const { history } = this.context.router
    const { title } = history.location.state
    const { envelope, isNew, catagories } = this.state

    return (
      <NB.Container>
        <NB.Header>
          <NB.Left>
            <NB.Button transparent
              onPress={() => history.goBack()}
            >
              <NB.Icon name='close' />
            </NB.Button>
          </NB.Left>
          <NB.Body>
            <NB.Title>{title}</NB.Title>
          </NB.Body>
          <NB.Right>
            <NB.Button transparent
              onPress={this.handleSubmit}
            >
              <NB.Text>{isNew ? 'Add' : 'Save'}</NB.Text>
            </NB.Button>
          </NB.Right>
        </NB.Header>

        <NB.Content padder>
          <NB.Form>
            <NB.Item stackedLabel>
              <NB.Label>Name</NB.Label>
              <NB.Input
                autoCorrect
                value={envelope.name}
                onChangeText={value => this.onChangeText('name', value)}
              />
            </NB.Item>
            <NB.Item stackedLabel>
              <NB.Label>Description</NB.Label>
              <NB.Input
                autoCorrect
                multiline
                value={envelope.desc}
                onChangeText={value => this.onChangeText('desc', value)}
              />
            </NB.Item>
            <NB.Item inlineLabel>
              <NB.Label style={{flex: 1}}>Catagory</NB.Label>
              <NB.Picker
                style={{flex: 2}}
                iosHeader='Catagory'
                placeholder='Catagory'
                mode='dropdown'
                selectedValue={envelope.catId}
                onValueChange={(itemValue, itemIndex) => this.onChangeText('catId', itemValue)}
              >
                {catagories.map((catagory) => (
                  <NB.Item
                    label={catagory.name}
                    value={catagory.id}
                    key={catagory.id}
                  />
                ))}
              </NB.Picker>
            </NB.Item>

            <NB.View style={{marginTop: 5}}>
              <NB.Grid>
                <NB.Col>
                  <NB.Item stackedLabel>
                    <NB.Label style={{flex: 1}}>Saving</NB.Label>
                    <NumberInput
                      style={{flex: 2}}
                      defaultValue={envelope.goal.min.toString()}
                      onChangeText={value => this.onChangeText('goal', {
                        ...envelope.goal,
                        min: parseFloat(value),
                      })}
                    />
                  </NB.Item>
                </NB.Col>
                <NB.Col>
                  <NB.Item stackedLabel>
                    <NB.Label>Budget</NB.Label>
                    <NumberInput
                      defaultValue={envelope.goal.max.toString()}
                      onChangeText={value => this.onChangeText('goal', {
                        ...envelope.goal,
                        max: parseFloat(value),
                      })}
                    />
                  </NB.Item>
                </NB.Col>
              </NB.Grid>
            </NB.View>

            <NB.Item inlineLabel>
              <NB.Label style={{flex: 1}}>Repeat</NB.Label>
              <NB.Picker
                style={{flex: 2}}
                iosHeader='Repeat'
                placeholder='Repeat'
                mode='dropdown'
                selectedValue={envelope.repeat}
                onValueChange={selectedRepeat => {
                  this.setState({
                    ...this.state,
                    envelope: {
                      ...this.state.envelope,
                      repeat: selectedRepeat,
                      currency: '', // can not have a repeat envelope with non default currency
                    },
                  })
                }}
              >
                <NB.Item label='None' value='' key='1' />
                <NB.Item label='Monthly' value='M' key='2' />
                <NB.Item label='Quarterly' value='Q' key='2' />
                <NB.Item label='Yearly' value='Y' key='3' />
              </NB.Picker>
            </NB.Item>

            { envelope.repeat === '' ? (
              <SelectCurrency
                defaultValue={envelope.currency}
                onChangeText={value => this.onChangeText('currency', value)} />
            ) : (
              <NB.Item inlineLabel style={{padding: 3}}>
                <NB.Icon name='info' />
                <NB.Text style={{flex: 2}}>Can not have a repeat envelope with a non default currency</NB.Text>
              </NB.Item>
            )}

            <NB.View style={{marginTop: 15}}>
              <NB.Button block warning iconLeft
                onPress={this.onPressResetAmount}
              >
                <NB.Icon name='reload' />
                <NB.Text>Reset Amount</NB.Text>
              </NB.Button>
            </NB.View>
          </NB.Form>
        </NB.Content>

      </NB.Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    catagories: state.catagories,
    envelopes: state.envelopes,
  }
}

export default connect(mapStateToProps, dispatch => ({}))(EnvelopeEdit)
