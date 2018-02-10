import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import PropTypes from 'prop-types'
import { Alert } from 'react-native'
import * as NB from 'native-base'

import uniqueId from 'lodash.uniqueid'
import NumberInput from '../components/NumberInput'

export default class EnvelopeEdit extends Component {
  constructor (props) {
    super(props)

    // binds
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onPressResetAmount = this.onPressResetAmount.bind(this)

    this.state = {}
  }

  componentWillMount () {
    const { envelope, catagories } = this.props.navigation.state.params

    let defaultNewEnvelope = {
      name: '', desc: '', catId: 'living_expences', amount: 0, burn: 0, goal: {min: 0, max: 0},
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
          }),
          catagories: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          })).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }

  handleSubmit () {
    const { envelope, isNew } = this.state

    // check values
    if (envelope.name.length === 0) {
      Alert.alert('Name too short')
    } else if (!envelope.catId) {
      Alert.alert('No catagory selected')
    } else {
      const { name, desc, catId, amount, burn, goal } = envelope
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
      const { onSubmit } = this.props.navigation.state.params

      // Alert.alert('Test',
      //   `id: ${id}\nname: ${name}\ndesc: ${desc}\ncatId: ${catId}\namount: ${amount}\ngoal: {\n\tmin: ${goal.min}\n\tmax: ${goal.max}\n}`
      // )

      onSubmit({
        id,
        name,
        desc,
        catId,
        amount,
        burn,
        goal,
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
            <NB.Picker
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
            <NB.Grid>
              <NB.Col>
                <NB.Item stackedLabel>
                  <NB.Label>Saving</NB.Label>
                  <NumberInput
                    style={{flex: 1}}
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

            <NB.Button block warning iconLeft
              onPress={this.onPressResetAmount}
            >
              <NB.Icon name='reload' />
              <NB.Text>Reset Amount</NB.Text>
            </NB.Button>
          </NB.Form>
        </NB.Content>

      </NB.Container>
    )
  }
}
