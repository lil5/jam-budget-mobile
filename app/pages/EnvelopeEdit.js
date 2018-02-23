import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import * as NB from 'native-base'

import uniqueId from 'lodash.uniqueid'
import NumberInput from '../components/NumberInput'
import SelectCurrency from '../components/SelectCurrency'

class EnvelopeEdit extends Component {
  constructor (props) {
    super(props)

    // binds
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onPressResetAmount = this.onPressResetAmount.bind(this)

    this.state = {}
  }

  componentWillMount () {
    const { envelope } = this.props.navigation.state.params
    const { catagories } = this.props

    const defaultNewEnvelope = {
      name: '',
      desc: '',
      catId: 'living_expences',
      amount: 0,
      burn: 0,
      goal: {min: 0, max: 0},
      currency: '',
      reaccuring: '',
    }

    const isNew = envelope === undefined

    this.setState({
      ...this.state,
      isNew,
      catagories,
      envelope: isNew ? defaultNewEnvelope : envelope,
    })
  }

  static navigationOptions = { header: null, tabBarVisible: false }
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      state: PropTypes.shape({
        params: PropTypes.shape({
          title: PropTypes.string.isRequired,
          onSubmit: PropTypes.func.isRequired,
          envelope: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            desc: PropTypes.string.isRequired,
            catId: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            burn: PropTypes.number.isRequired,
            goal: PropTypes.object.isRequired,
            currency: PropTypes.string.isRequired,
            reaccuring: PropTypes.string.isRequired,
          }),
        }).isRequired,
      }).isRequired,
    }).isRequired,
    // redux
    catagories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }

  handleSubmit () {
    const { envelope, isNew } = this.state

    // check values
    if (envelope.name.length === 0) {
      Alert.alert('Name too short')
    } else if (!envelope.catId) {
      Alert.alert('No catagory selected')
    } else {
      const {
        name,
        desc,
        catId,
        amount,
        burn,
        goal,
        currency,
        reaccuring,
      } = envelope
      // add ids
      let id
      if (!envelope.id) {
        id = uniqueId(name.toLowerCase())
      } else id = envelope.id

      if (isNew) {
        this.props.navigation.goBack()
      } else {
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'Envelopes' }),
            NavigationActions.navigate({
              routeName: 'Envelope',
              params: { envelopeId: envelope.id },
            }),
          ],
        }))
      }

      if (reaccuring !== '' && currency !== '') {

      }

      const { onSubmit } = this.props.navigation.state.params

      onSubmit({
        id,
        name,
        desc,
        catId,
        amount,
        burn,
        goal,
        currency,
        reaccuring,
      })
    }
  }

  // handleNewCategory () {
  //   this.props.onNewCategory()
  // }

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
    const { navigation } = this.props
    const { title } = this.props.navigation.state.params
    const { envelope, isNew, catagories } = this.state

    return (
      <NB.Container>
        <NB.Header>
          <NB.Left>
            <NB.Button transparent
              onPress={() => navigation.goBack()}
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
                selectedValue={envelope.reaccuring}
                onValueChange={selectedRepeat => {
                  this.setState({
                    ...this.state,
                    envelope: {
                      ...this.state.envelope,
                      reaccuring: selectedRepeat,
                      currency: '', // can not have a reaccuring envelope with non default currency
                    },
                  })
                }}
              >
                <NB.Item label='None' value='' key='1' />
                <NB.Item label='Monthly' value='M' key='2' />
                <NB.Item label='Yearly' value='Y' key='3' />
              </NB.Picker>
            </NB.Item>

            { envelope.reaccuring === '' ? (
              <SelectCurrency
                defaultValue={envelope.currency}
                onChangeText={value => this.onChangeText('currency', value)} />
            ) : (
              <NB.Item inlineLabel style={{padding: 3}}>
                <NB.Icon name='info' />
                <NB.Text style={{flex: 2}}>Can not have a reaccuring envelope with a non default currency</NB.Text>
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
  }
}

export default connect(mapStateToProps, dispatch => ({}))(EnvelopeEdit)
