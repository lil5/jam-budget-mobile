import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createEnvelope, updateReaccuring } from '../redux/actions'
import PropTypes from 'prop-types'
import { SectionList, Alert } from 'react-native'
import * as NB from 'native-base'
import CurrencyFormatter from '../util/currency-formatter'
import palette from '../palette'
import Big from 'big.js'

class Envelopes extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  componentWillMount () {
    this.setState({
      searchText: '',
      isSearching: false,
    })
  }

  componentWillUpdate () {
    this.props.updateReaccuring()
  }

  static navigationOptions = {
    header: null,
  }
  static propTypes = {
    // rn navigation
    navigation: PropTypes.object.isRequired,
    // redux store
    redux: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        catId: PropTypes.string,
        desc: PropTypes.string,
        amount: PropTypes.number,
        goal: PropTypes.object,
        currency: PropTypes.string,
        reaccuring: PropTypes.string,
      })),
      catagories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })),
      unsorted: PropTypes.number,
      defaultCurrency: PropTypes.string,
    }),
    // redux actions
    createEnvelope: PropTypes.func.isRequired,
    updateReaccuring: PropTypes.func.isRequired,
  }

  renderToBeBudgeted () {
    return (
      <NB.List style={{backgroundColor: palette.secondaryColor}}>
        <NB.ListItem onPress={() => { Alert.alert('Not implemented yet') }}>
          <NB.Body>
            <NB.Text style={{color: 'white', marginLeft: 0}}>Unsorted</NB.Text>
          </NB.Body>
          <NB.Right style={{alignItems: 'flex-end', flex: 1}}>
            <NB.H1 style={{color: 'white'}}>
              {new CurrencyFormatter(this.props.redux.defaultCurrency).format(this.props.redux.unsorted)}
            </NB.H1>
          </NB.Right>
        </NB.ListItem>
      </NB.List>
    )
    // <NB.H1 style={{color: 'white'}}>{new CurrencyFormatter(
    //     this.props.redux.defaultCurrency
    //   ).format(this.props.redux.unsorted)}</NB.H1>
  }

  renderList () {
    const { data, catagories } = this.props.redux
    const list = []

    catagories.forEach((cat, indexCat) => {
      list.push({
        title: cat.name,
        data: data.filter(e => {
          let search = true
          if (this.state.searchText !== '') {
            search = e.name.includes(this.state.searchText)
          }

          return ((e.catId === cat.id) && search)
        }),
      })
    })

    return list
  }

  render () {
    const { navigation, redux } = this.props

    return (
      <NB.Container>
        {this.state.isSearching
          ? (<NB.Header searchBar rounded>
            <NB.Item>
              <NB.Icon name='arrow-left'
                onPress={() => this.setState({...this.state, isSearching: false})}
              />
              <NB.Input placeholder='search'
                autoFocus
                value={this.state.searchText}
                onChangeText={value => this.setState({ searchText: value })}
              />
              <NB.Icon name='close'
                onPress={() => this.setState({ searchText: '' })}
              />
            </NB.Item>
          </NB.Header>)
          : (<NB.Header>
            <NB.Body>
              <NB.Title style={{ fontSize: 20, marginRight: 0 }}>Envelope Budget</NB.Title>
            </NB.Body>
            <NB.Right>
              <NB.Button transparent
                onPress={() => navigation.navigate('EnvelopeEdit', {
                  title: 'New Envelope',
                  onSubmit: el => this.props.createEnvelope(el),
                })}
              >
                <NB.Icon name='note' />
              </NB.Button>
              <NB.Button transparent
                onPress={() => this.setState({...this.state, isSearching: true})}
              >
                <NB.Icon name='magnifier' />
              </NB.Button>
            </NB.Right>
          </NB.Header>
          )}

        <NB.Content>
          {redux.unsorted !== 0 && this.renderToBeBudgeted()}

          <SectionList
            keyExtractor={(item, index) => item.id}
            sections={this.renderList()}
            renderSectionHeader={({section}) => (
              <NB.Separator bordered>
                <NB.Text>{section.title.toUpperCase()}</NB.Text>
              </NB.Separator>
            )}
            renderItem={({item, index}) => {
              const avalible = parseFloat(Big(item.amount).plus(item.goal.max).toString())
              const thisCurrency = new CurrencyFormatter(this.props.redux.defaultCurrency, item.currency)
              const isTooLong = thisCurrency.format(avalible).length > 8
              const styleRight = {
                right: isTooLong ? {flex: 1} : {width: 100},
                badge: {paddingLeft: 3, paddingRight: 3},
              }
              return (
                <NB.ListItem icon onPress={() => navigation.navigate('Envelope', {envelopeId: item.id})}>
                  <NB.Left>
                    <NB.Button transparent onPress={() => navigation.navigate('AddTransaction', {activeEnvelopeId: item.id})}>
                      <NB.Icon active name='plus' />
                    </NB.Button>
                  </NB.Left>
                  <NB.Body>
                    <NB.Text>{item.name}</NB.Text>
                  </NB.Body>
                  { (item.goal.max > 0 && !isTooLong) &&
                  <NB.Right style={[{paddingRight: 0}, styleRight.right]}>
                    <NB.Badge style={{backgroundColor: 'transparent', paddingLeft: 0}} >
                      <NB.Text style={{color: 'black'}}>
                        {thisCurrency.format(avalible)}
                      </NB.Text>
                    </NB.Badge>
                  </NB.Right>}
                  <NB.Right style={styleRight.right}>
                    <NB.Badge
                      success={item.amount >= 0 && avalible > 5}
                      warning={item.amount < 0 && avalible > 5}
                      danger={avalible < -5}
                      style={[avalible > -5 && avalible < 5 ? {backgroundColor: 'transparent'} : {}, styleRight.badge]}
                    >
                      <NB.Text style={avalible > -5 && avalible < 5 ? {color: 'black'} : {}}>
                        {thisCurrency.format(item.amount)}
                      </NB.Text></NB.Badge>
                  </NB.Right>
                </NB.ListItem>
              )
            }}
          />
        </NB.Content>
      </NB.Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    redux: state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createEnvelope: (e) => {
      dispatch(createEnvelope(e))
    },
    updateReaccuring: () => {
      dispatch(updateReaccuring())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Envelopes)
