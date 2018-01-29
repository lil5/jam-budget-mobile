import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Text,
  ScrollView,
  Alert,
} from 'react-native'
import { COLOR, Toolbar, ListItem, RadioButton, ActionButton } from 'react-native-material-ui'
import NumberInput from '../components/NumberInput'
import ListOfEnvelopes from '../components/ListOfEnvelopes'
import Container from '../components/Container'

export default class AddTransaction extends Component {
  static navigationOptions = { header: null, drawerLockMode: 'locked-closed' }
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      //     dispatch: PropTypes.func.isRequired,
      state: PropTypes.shape({
        params: PropTypes.shape({
          onSubmit: PropTypes.func.isRequired,
          //         activeEnvelopeId: PropTypes.string,
          //         envelopes: PropTypes.array.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }
  static contextTypes = {
    uiTheme: PropTypes.object.isRequired,
  }

  constructor (props) {
    super(props)

    this.handelSubmit = this.handelSubmit.bind(this)
  }

  componentWillMount () {
    const navParams = this.props.navigation.state.params

    // add defaultValue for activeEnvelopeId
    const activeEnvelopeId = navParams.hasOwnProperty('activeEnvelopeId')
      ? navParams.activeEnvelopeId : 'false'

    this.setState({
      number: '-',
      activeEnvelopeId,
    })
  }

  handelSubmit () {
    const { navigation } = this.props
    const { onSubmit } = this.props.navigation.state.params
    const { number, activeEnvelopeId } = this.state

    Alert.alert(`id: ${activeEnvelopeId}`)

    onSubmit({amount: parseFloat(number), id: activeEnvelopeId})
    navigation.goBack()
  }

  render () {
    const { navigation } = this.props
    const { palette } = this.context.uiTheme
    const { activeEnvelopeId } = this.state
    const colorToolbar = (this.state.number < 0)
      ? COLOR.red400
      : (this.state.number > 0)
        ? COLOR.green400
        : palette.primaryColor

    return (
      <Container>
        <Toolbar
          style={{container: { backgroundColor: colorToolbar }}}
          leftElement='clear'
          onLeftElementPress={() => navigation.goBack()}
          centerElement={'Add ' + ((this.state.number < 0)
            ? 'Expence'
            : (this.state.number > 0)
              ? 'Income'
              : 'Transaction')}
        />

        <NumberInput
          style={{fontSize: 90, margin: 15}}
          autoFocus
          selectTextOnFocus={false}
          onChangeText={str => this.setState({number: str})}
          defaultValue={this.state.number}
        />

        <ScrollView>
          <ListOfEnvelopes
            renderSectionHeader={null}
            renderItem={({item, index}) => (
              <RadioButton
                label={item.name}
                value={item.id}
                onSelect={() => this.setState({
                  ...this.state,
                  activeEnvelopeId: item.id,
                })}
                checked={activeEnvelopeId === item.id}
              />
            )}
          />
        </ScrollView>
        <RadioButton
          label={'Unsorted'}
          value={'false'}
          onSelect={() => this.setState({
            ...this.state,
            activeEnvelopeId: 'false',
          })}
          checked={activeEnvelopeId === 'false'}
        />

        <ActionButton
          icon='done'
          onPress={this.handelSubmit}
        />

      </Container>
    )
  }
}
