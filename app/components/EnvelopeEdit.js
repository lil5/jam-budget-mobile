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
} from 'react-native-material-ui'
import Container from './Container'

import StyleGlobals from '../styles/Globals'

export default class EnvelopeEdit extends Component {
  constructor (props) {
    super(props)

    // binds
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {}
  }

  componentWillMount () {
    const { envelope } = this.props.navigation.state.params

    let defaultNewEnvelope = {
      name: '', desc: '', amount: 0, goals: [],
    }

    this.setState({
      ...this.state,
      envelope: envelope === undefined ? defaultNewEnvelope : envelope,
    })
  }

  static navigationOptions = { header: null, drawerLockMode: 'locked-closed' }
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          title: PropTypes.string.isRequired,
          onSubmit: PropTypes.func.isRequired,
          envelope: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            catId: PropTypes.string.isRequired,
            desc: PropTypes.string,
            amount: PropTypes.number,
            goals: PropTypes.arrayOf(PropTypes.shape({
              minAmount: PropTypes.number,
              maxAmount: PropTypes.number,
            })),
          }),
        }).isRequired,
      }).isRequired,
    }).isRequired,
    // catagories: PropTypes.arrayOf(PropTypes.shape({
    //   id: PropTypes.string.isRequired,
    //   name: PropTypes.string.isRequired,
    // })).isRequired,
  }
  static contextTypes = {
    uiTheme: PropTypes.object.isRequired,
  }

  handleSubmit () {
    // check values
    // add ids

    // const { onSubmit } = this.props.navigation.state.params
    // onSubmit(this.state.envelope)
  }

  // handleNewCategory () {
  //   this.props.onNewCategory()
  // }

  render () {
    const { navigation } = this.props
    // const { envelope, onSubmit, title } = this.props.navigation.state.params
    const { title } = this.props.navigation.state.params
    const { palette } = this.context.uiTheme

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
              placeholder='name' />
            <TextInput
              placeholder='description' multiline />
            <TextInput
              keyboardType='numeric'
              placeholder='amount' />
          </ScrollView>
        </View>

      </Container>
    )
    // <ListItem
    // centerElement={<Picker
    //   style={{flex: 1}}
    //   selectedValue={this.state.envelope.catId}
    //   onValueChange={(itemValue, itemIndex) => this.setState({catagory: itemValue})}>
    //   <Picker.Item label='Java' value='java' />
    //   <Picker.Item label='JavaScript' value='js' />
    //   </Picker>}
    //   rightElement='plus'
    //   />
    // <InputNumber />
  }
}

const styles = StyleSheet.create({

})
