import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Alert,
  Text,
  TextInput,
  ScrollView,
  View,
  Picker,
} from 'react-native'
import {
  Card,
  Avatar,
  Toolbar,
  ListItem,
  Button,
} from 'react-native-material-ui'
import Container from './Container'
import uniqueId from 'lodash.uniqueid'

import StyleGlobals from '../styles/Globals'

export default class EnvelopeEdit extends Component {
  constructor (props) {
    super(props)

    // binds
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {}
  }

  componentWillMount () {
    const { envelope, catagories } = this.props.navigation.state.params

    let defaultNewEnvelope = {
      name: '', desc: '', catId: 'living_expences', amount: 0, goals: [],
    }

    const isNew = envelope === undefined

    this.setState({
      ...this.state,
      isNew,
      catagories,
      envelope: isNew ? defaultNewEnvelope : envelope,
    })
  }

  static navigationOptions = { header: null, drawerLockMode: 'locked-closed' }
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
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
            goals: PropTypes.arrayOf(PropTypes.shape({
              minAmount: PropTypes.number,
              maxAmount: PropTypes.number,
            })).isRequired,
          }),
          catagories: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
          })).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }
  static contextTypes = {
    uiTheme: PropTypes.object.isRequired,
  }

  handleSubmit () {
    const envelope = this.state.envelope

    // check values
    if (envelope.name.length <= 0) {
      Alert.alert(
        'Name too short',
        `"${envelope.name}"`
      )
    } else if (!envelope.catId) {
      Alert.alert('no catagory selected')
    }
    // Need a goal?
    // elseif (goals.length > 0) {
    //   Alert.alert(
    //     ''
    //   )
    // }
    else {
      const { name, desc, catId, amount, goals } = envelope
      // add ids
      let id
      if (!envelope.id) {
        id = uniqueId(name.toLowerCase())
      } else id = envelope.id

      // Alert.alert(
      //   'test',
      //   `id: ${id}\nname: ${name}\ndesc: ${desc}\ncatId: ${catId}\namount: ${amount}\nstate.isNew: ${this.state.isNew}`
      // )

      this.props.navigation.goBack()
      const { onSubmit } = this.props.navigation.state.params

      onSubmit({
        id,
        name,
        desc,
        catId,
        amount,
        goals,
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

  render () {
    const { navigation } = this.props
    // const { onSubmit, title } = this.props.navigation.state.params
    const { title } = this.props.navigation.state.params
    const { palette } = this.context.uiTheme
    const { envelope, isNew, catagories } = this.state

    return (
      <Container>
        <Toolbar
          leftElement='clear'
          onLeftElementPress={() => navigation.goBack()}
          centerElement={title}
          rightElement='save'
          onRightElementPress={this.handleSubmit}
        />

        <View style={{flex: 1, padding: 12}}>
          <ScrollView>
            <TextInput
              defaultValue={envelope.name}
              onChangeText={value => this.onChangeText('name', value)}
              autoCorrect
              placeholder='name' />
            <TextInput
              autoCorrect
              defaultValue={envelope.desc}
              onChangeText={value => this.onChangeText('desc', value)}
              placeholder='description' multiline />
            <Picker
              selectedValue={envelope.catId}
              onValueChange={(itemValue, itemIndex) => this.onChangeText('catId', itemValue)}
            >
              {catagories.map((catagory) => (
                <Picker.Item
                  label={catagory.name}
                  value={catagory.id}
                />
              ))}
            </Picker>
            { !isNew && (
              <Button primary
                text='Empty Amount'
                icon='settings-backup-restore'
                onPress={() => Alert.alert(
                  'Are you sure?',
                  'This will reset the envelope counter back to zero.',
                  [
                    { text: 'Cancel', onPress: () => {} },
                    { text: 'OK', onPress: () => this.onChangeText('amount', 0) },
                  ],
                )}
              />
            )}

            <Card style={{container: {backgroundColor: palette.secondaryColor}}}>
              <Text>Goal</Text>
              <TextInput
                keyboardType='numeric'
                placeholder='Mininum' />
              <TextInput
                keyboardType='numeric'
                placeholder='Maximum' />
            </Card>
          </ScrollView>
        </View>

      </Container>
    )
  }
}

const styles = StyleSheet.create({

})
