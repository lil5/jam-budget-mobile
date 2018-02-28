import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateEnvelopeAmount } from '../redux/actions'
import PropTypes from 'prop-types'
import { ScrollView, Alert } from 'react-native'
import * as NB from 'native-base'
import NumberInput from '../components/NumberInput'
import ListOfEnvelopes from '../components/ListOfEnvelopes'
import palette from '../palette'

class AddTransaction extends Component {
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
    envelopes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,

    // router url
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),

    // redux actions
    updateEnvelopeAmount: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)

    this.handelSubmit = this.handelSubmit.bind(this)
  }

  componentWillMount () {
    const params = this.props.match.params
    // add defaultValue for activeEnvelopeId
    const activeEnvelopeId = params.hasOwnProperty('id')
      ? params.id : 'false'

    this.setState({
      number: '-',
      activeEnvelopeId,
    })
  }

  handelSubmit () {
    const { history } = this.context.router
    const { updateEnvelopeAmount } = this.props
    const { number, activeEnvelopeId } = this.state

    if (!isNaN(number)) {
      updateEnvelopeAmount({amount: number, id: activeEnvelopeId})
      history.goBack()
    } else {
      Alert.alert('Error: NaN', 'at /app/pages/AddTransaction.js:handelSubmit()')
    }
  }

  render () {
    const { history } = this.context.router
    const { envelopes } = this.props
    const { activeEnvelopeId } = this.state
    const colorToolbar = (this.state.number < 0)
      ? palette.danger
      : (this.state.number > 0)
        ? palette.success
        : palette.primaryColor

    return (
      <NB.Container>
        <NB.Header backgroundColor={colorToolbar} >
          <NB.Left>
            <NB.Button transparent
              onPress={() => history.goBack()}
            >
              <NB.Icon name='close' />
            </NB.Button>
          </NB.Left>
          <NB.Body><NB.Title>
            {'' + ((this.state.number < 0)
              ? 'Expence'
              : (this.state.number > 0)
                ? 'Income'
                : 'Transaction')}
          </NB.Title></NB.Body>
          <NB.Right>
            {!(this.state.number === '' || this.state.number === '-') &&
            <NB.Button transparent
              onPress={this.handelSubmit} >
              <NB.Text>Add</NB.Text>
            </NB.Button>
            }
          </NB.Right>
        </NB.Header>

        <NB.Form style={{flex: 1}}>
          <NumberInput
            style={{fontSize: 90, margin: 15}}
            autoFocus
            selectTextOnFocus={false}
            onChangeText={str => this.setState({number: str})}
            defaultValue={this.state.number}
          />

          <ScrollView>
            <NB.ListItem
              onPress={() => this.setState({
                ...this.state,
                activeEnvelopeId: 'false',
              })}
            >
              <NB.Body><NB.Text>Unsorted</NB.Text></NB.Body>
              <NB.Right>
                <NB.Radio
                  onPress={() => this.setState({
                    ...this.state,
                    activeEnvelopeId: 'false',
                  })}
                  selected={activeEnvelopeId === 'false'}
                />
              </NB.Right>
            </NB.ListItem>

            <ListOfEnvelopes
              envelopes={envelopes}
              renderSectionHeader={null}
              renderItem={({item, index}) => (
                <NB.ListItem
                  onPress={() => this.setState({
                    ...this.state,
                    activeEnvelopeId: item.id,
                  })}
                >
                  <NB.Body><NB.Text>{item.name}</NB.Text></NB.Body>
                  <NB.Right>
                    <NB.Radio
                      onPress={() => this.setState({
                        ...this.state,
                        activeEnvelopeId: item.id,
                      })}
                      selected={activeEnvelopeId === item.id}
                    />
                  </NB.Right>
                </NB.ListItem>
              )}
            />
          </ScrollView>
        </NB.Form>

      </NB.Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    envelopes: state.envelopes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateEnvelopeAmount: (e) => {
      dispatch(updateEnvelopeAmount(e))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction)
