import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateJarAmountUnsorted } from '../redux/actions'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'
import CurrencyFormatter from '../util/currency-formatter'
import ListOfJars from '../components/ListOfJars'
import NumberInput from '../components/NumberInput'
import Big from 'big.js'
import * as NB from 'native-base'
import palette from '../palette'

class Unsorted extends Component {
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
    // redux store
    defaultCurrency: PropTypes.string.isRequired,
    jars: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      catId: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      repeat: PropTypes.string.isRequired,
    })),
    unsorted: PropTypes.number.isRequired,
    // redux actions
    updateJarAmountUnsorted: PropTypes.func.isRequired,
  }

  componentWillMount () {
    const { jars, unsorted } = this.props

    let totalBig = Big(unsorted)
    jars.forEach(j => {
      totalBig.plus(j.amount)
    })
  }

  render () {
    const { history } = this.context.router
    const { jars, defaultCurrency, unsorted, updateJarAmountUnsorted } = this.props
    const thisCurrency = new CurrencyFormatter(defaultCurrency)

    return (
      <NB.Container>
        <NB.Header style={{backgroundColor: palette.secondaryColor}}>
          <NB.Left>
            <NB.Button transparent
              onPress={() => history.goBack()}
            >
              <NB.Icon name='arrow-left' />
            </NB.Button>
          </NB.Left>
          <NB.Body>
            <NB.Title>Unsorted</NB.Title>
          </NB.Body>
          <NB.Right style={{flex: 0}}>
            <NB.H1 style={{color: 'white'}}>
              {thisCurrency.format(unsorted)}
            </NB.H1>
          </NB.Right>
        </NB.Header>
        <NB.Content>
          <NB.Form>
            <ScrollView>
              <ListOfJars
                jars={jars}
                renderItem={({item, index}) => {
                  return (
                    <NB.ListItem>
                      <NB.Body>
                        <NB.Text>{item.name}</NB.Text>
                      </NB.Body>
                      <NB.Right style={{position: 'relative'}}>
                        <NumberInput
                          defaultValue={item.amount.toString()}
                          onChangeText={amount => {
                            if (amount !== '' || amount !== '') {
                              updateJarAmountUnsorted({ id: item.id, amount })
                            }
                          }}
                          style={{
                            margin: 0,
                            width: 100,
                            position: 'absolute',
                            top: -25,
                            right: 0,
                            borderBottomWidth: 1,
                            borderBottomColor: palette.secondaryColor,
                          }}
                        />
                      </NB.Right>
                    </NB.ListItem>
                  )
                }}
              />
            </ScrollView>
          </NB.Form>
        </NB.Content>
      </NB.Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    defaultCurrency: state.defaultCurrency,
    unsorted: state.unsorted,
    jars: state.jars.filter(j => (j.currency === '')),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateJarAmountUnsorted: (j) => {
      dispatch(updateJarAmountUnsorted(j))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Unsorted)
