import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateJarAmount } from '../redux/actions'
import PropTypes from 'prop-types'
import { ScrollView, Alert } from 'react-native'
import * as NB from 'native-base'
import NumberInput from '../components/NumberInput'
import ListOfJars from '../components/ListOfJars'
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
    jars: PropTypes.arrayOf(PropTypes.shape({
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
    updateJarAmount: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)

    this.handelSubmit = this.handelSubmit.bind(this)
  }

  componentWillMount () {
    const params = this.props.match.params
    // add defaultValue for activeJarId
    const activeJarId = params.hasOwnProperty('id')
      ? params.id : 'false'

    this.setState({
      number: '-',
      activeJarId,
    })
  }

  handelSubmit () {
    const { history } = this.context.router
    const { updateJarAmount } = this.props
    const { number, activeJarId } = this.state

    if (!isNaN(number)) {
      updateJarAmount({amount: number, id: activeJarId})
      history.goBack()
    } else {
      Alert.alert('Error: NaN', 'at /app/pages/AddTransaction.js:handelSubmit()')
    }
  }

  render () {
    const { history } = this.context.router
    const { jars } = this.props
    const { activeJarId } = this.state
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
                activeJarId: 'false',
              })}
            >
              <NB.Body><NB.Text>Unsorted</NB.Text></NB.Body>
              <NB.Right>
                <NB.Radio
                  onPress={() => this.setState({
                    ...this.state,
                    activeJarId: 'false',
                  })}
                  selected={activeJarId === 'false'}
                />
              </NB.Right>
            </NB.ListItem>

            <ListOfJars
              jars={jars}
              renderSectionHeader={null}
              renderItem={({item, index}) => (
                <NB.ListItem
                  onPress={() => this.setState({
                    ...this.state,
                    activeJarId: item.id,
                  })}
                >
                  <NB.Body><NB.Text>{item.name}</NB.Text></NB.Body>
                  <NB.Right>
                    <NB.Radio
                      onPress={() => this.setState({
                        ...this.state,
                        activeJarId: item.id,
                      })}
                      selected={activeJarId === item.id}
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
    jars: state.jars,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateJarAmount: (j) => {
      dispatch(updateJarAmount(j))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction)
