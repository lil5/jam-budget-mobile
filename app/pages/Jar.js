import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as NB from 'native-base'
import palette from '../palette'
import { updateJar, deleteJar } from '../redux/actions'
import PropTypes from 'prop-types'
import CurrencyFormatter from '../util/currency-formatter'
import Big from 'big.js'
import {
  Alert,
  ScrollView,
} from 'react-native'

class Jar extends Component {
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
    jars: PropTypes.arrayOf(PropTypes.shape({
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
    updateJar: PropTypes.func.isRequired,
    deleteJar: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {}

    this.onPressDelete = this.onPressDelete.bind(this)
    this.onPressEdit = this.onPressEdit.bind(this)
  }

  componentWillMount () {
    const { id } = this.props.match.params
    const { jars } = this.props
    this.setState({
      jar: jars.find(item => item.id === id),
    })
  }

  onPressDelete () {
    const { history } = this.context.router
    const { jar } = this.state
    const { deleteJar } = this.props

    Alert.alert(
      'Delete Jar',
      'Are you sure you want to delete this jar?\n' +
      '\nNote: this will not remove the transactions associated but will break their connection to an jar.',
      [{text: 'Cancel', onPress: () => {}},
        {text: 'OK',
          onPress: () => {
            history.goBack()
            deleteJar(jar)
          }}],
    )
  }
  onPressEdit () {
    const { history } = this.context.router
    const { updateJar } = this.props
    const { jar } = this.state

    history.push(`/jar/${jar.id}/edit`, {
      title: `Edit ${jar.name}`,
      onSubmit: j => updateJar(j),
    })
  }

  render () {
    const { history } = this.context.router
    const { jar } = this.state
    const { defaultCurrency, catagories } = this.props
    const isBudget = jar.goal.type === 'budget'
    const thisCurrency = new CurrencyFormatter(
      defaultCurrency, jar.currency)

    return (
      <NB.Container>
        <NB.Header>
          <NB.Left>
            <NB.Button transparent onPress={() => history.goBack()}>
              <NB.Icon name='arrow-left' />
            </NB.Button>
          </NB.Left>
          <NB.Body>
            <NB.Title>{jar.name}</NB.Title>
            <NB.Subtitle>{catagories.find(cat => cat.id === jar.catId).name}</NB.Subtitle>
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
                <NB.H1 style={{color: 'white'}}>{thisCurrency.format(Big(jar.amount).toString())}</NB.H1>
              </NB.Col>
            </NB.ListItem>

            <NB.ListItem>
              <NB.Col>
                <NB.H3 style={{color: 'white'}}>Costs</NB.H3>
              </NB.Col>
              <NB.Col style={{alignItems: 'flex-end'}}>
                <NB.H1 style={{color: 'white'}}>{thisCurrency.format(Big(jar.burn).times(-1).toString())}</NB.H1>
              </NB.Col>
            </NB.ListItem>

            {jar.goal.amount > 0 && (
              <NB.ListItem>
                <NB.Col>
                  <NB.H3 style={{color: 'white'}}>{isBudget ? 'Available' : 'To Collect'}</NB.H3>
                </NB.Col>
                <NB.Col style={{alignItems: 'flex-end'}}>
                  <NB.H1 style={{color: 'white'}}>
                    { isBudget
                      ? thisCurrency.format(Big(jar.burn).plus(jar.goal.amount).toString())
                      : thisCurrency.format(Big(jar.amount).minus(jar.goal.amount).times(-1).toString())
                    }
                  </NB.H1>
                </NB.Col>
              </NB.ListItem>
            )}

            {jar.goal.amount > 0 && (
              <NB.ListItem>
                <NB.Col>
                  <NB.H3 style={{color: 'white'}}>{isBudget ? 'Budget' : 'Saving'}</NB.H3>
                </NB.Col>
                <NB.Col style={{alignItems: 'flex-end'}}>
                  <NB.H1 style={{color: 'white'}}>{thisCurrency.format(jar.goal.amount)}</NB.H1>
                </NB.Col>
              </NB.ListItem>
            )}
          </NB.List>

          <ScrollView>
            { jar.desc.length > 0 && (
              <NB.Card transparent>
                <NB.CardItem header>
                  <NB.Icon name='info' />
                  <NB.H3>Notes</NB.H3>
                </NB.CardItem>
                <NB.CardItem>
                  <NB.Body>
                    <NB.Text>{jar.desc}</NB.Text>
                  </NB.Body>
                </NB.CardItem>
              </NB.Card>
            )}
          </ScrollView>
        </NB.Content>

      </NB.Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    jars: state.jars,
    catagories: state.catagories,
    defaultCurrency: state.defaultCurrency,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateJar: (j) => {
      dispatch(updateJar(j))
    },
    deleteJar: (id) => {
      dispatch(deleteJar(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Jar)
