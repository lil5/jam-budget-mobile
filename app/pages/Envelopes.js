import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createEnvelope, updateRepeat } from '../redux/actions'
import PropTypes from 'prop-types'
import ListOfEnvelopes from '../components/ListOfEnvelopes'
import * as NB from 'native-base'
import CurrencyFormatter from '../util/currency-formatter'
import Footer from '../components/Footer'
import palette from '../palette'
import Big from 'big.js'

class Envelopes extends Component {
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
    envelopes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      catId: PropTypes.string,
      desc: PropTypes.string,
      amount: PropTypes.number,
      goal: PropTypes.object,
      currency: PropTypes.string,
      repeat: PropTypes.string,
    })),
    catagories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })),
    unsorted: PropTypes.number,
    defaultCurrency: PropTypes.string,
    // redux actions
    createEnvelope: PropTypes.func.isRequired,
    updateRepeat: PropTypes.func.isRequired,
  }

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
    this.props.updateRepeat()
  }

  renderUnsorted () {
    const { defaultCurrency, unsorted } = this.props
    const { history } = this.context.router
    return (
      <NB.List style={{backgroundColor: palette.secondaryColor}}>
        <NB.ListItem onPress={() => history.push('/unsorted')}>
          <NB.Body style={{flex: 0}}>
            <NB.Text style={{color: 'white', marginRight: 0}}>Unsorted</NB.Text>
          </NB.Body>
          <NB.Right style={{alignItems: 'flex-end', flex: 1}}>
            <NB.H1 style={{color: 'white'}}>
              {new CurrencyFormatter(defaultCurrency).format(unsorted)}
            </NB.H1>
          </NB.Right>
        </NB.ListItem>
      </NB.List>
    )
  }

  render () {
    const { envelopes, unsorted, defaultCurrency } = this.props
    const { history } = this.context.router

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
              <NB.Title style={{ fontSize: 20, marginRight: 0 }}>Jam Budget</NB.Title>
            </NB.Body>
            <NB.Right>
              <NB.Button transparent
                onPress={() => history.push(`/envelope/new`, {
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
          {this.renderUnsorted()}

          <ListOfEnvelopes
            envelopes={envelopes.filter(e => (
              this.state.searchText !== ''
                ? e.name.includes(this.state.searchText)
                : true
            ))}
            renderItem={({item, index}) => {
              const avalible = parseFloat(Big(item.amount).plus(item.goal.max).toString())
              const thisCurrency = new CurrencyFormatter(defaultCurrency, item.currency)
              const isTooLong = thisCurrency.format(avalible).length > 8
              const styleRight = {
                right: isTooLong ? {flex: 1} : {width: 100},
                badge: {paddingLeft: 3, paddingRight: 3},
              }
              return (
                <NB.ListItem icon onPress={() => history.push(`/envelope/${item.id}`)}>
                  <NB.Left>
                    <NB.Button transparent onPress={() => history.push(`/add/${item.id}`)}>
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
        <Footer history={history} />
      </NB.Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    envelopes: state.envelopes,
    catagories: state.catagories,
    unsorted: state.unsorted,
    defaultCurrency: state.defaultCurrency,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createEnvelope: (e) => {
      dispatch(createEnvelope(e))
    },
    updateRepeat: () => {
      dispatch(updateRepeat())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Envelopes)
