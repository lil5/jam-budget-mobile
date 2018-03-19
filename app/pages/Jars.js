import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createJar, updateRepeat } from '../redux/actions'
import PropTypes from 'prop-types'
import ListOfJars from '../components/ListOfJars'
import * as NB from 'native-base'
import CurrencyFormatter from '../util/currency-formatter'
import Footer from '../components/Footer'
import palette from '../palette'
import Big from 'big.js'

class Jars extends Component {
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
    jars: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      catId: PropTypes.string,
      desc: PropTypes.string,
      amount: PropTypes.number,
      goal: PropTypes.object,
      currency: PropTypes.string,
      repeat: PropTypes.string,
    })),
    // catagories: PropTypes.arrayOf(PropTypes.shape({
    //   id: PropTypes.string,
    //   name: PropTypes.string,
    // })),
    unsorted: PropTypes.number,
    defaultCurrency: PropTypes.string,
    // redux actions
    createJar: PropTypes.func.isRequired,
    updateRepeat: PropTypes.func.isRequired,
  }

  constructor (props) {
    super(props)

    this.state = {
      searchText: '',
      isSearching: false,
    }
  }

  componentWillMount () {
    /* eslint-disable no-new */
    new Promise((resolve, reject) => {
      resolve(this.props.updateRepeat())
    })
    /* eslint-enable no-new */
  }

  componentWillUpdate () {
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
    const { jars, defaultCurrency } = this.props
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
                onPress={() => history.push(`/jar/new`, {
                  title: 'New Jar',
                  onSubmit: j => this.props.createJar(j),
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

          <ListOfJars
            jars={jars.filter(j => (
              this.state.searchText !== ''
                ? j.name.includes(this.state.searchText)
                : true
            ))}
            renderItem={({item, index}) => {
              const isBudget = item.goal.type === 'budget'
              const percent = parseFloat(Big(item.amount).div(item.goal.amount).times(100).round().toString())
              const avalible = isBudget
                ? parseFloat(Big(item.burn).plus(item.goal.amount).toString())
                : parseFloat(Big(item.goal.amount).minus(item.amount).toString())
              const thisCurrency = new CurrencyFormatter(defaultCurrency, item.currency)
              const isTooLong = thisCurrency.format(avalible).length > 8
              const styleRight = {
                right: {width: 100},
                badge: {paddingLeft: 3, paddingRight: 3},
              }
              const badgeColor = !(!(avalible < -5) || !(isBudget))
                ? 'danger'
                : avalible < 5 || !isBudget
                  ? 'black'
                  : item.amount < 0
                    ? 'warning' : 'success'
              return (
                <NB.ListItem icon onPress={() => history.push(`/jar/${item.id}`)}>
                  <NB.Left>
                    <NB.Button transparent onPress={() => history.push(`/add/${item.id}`, {isMinus: isBudget})}>
                      <NB.Icon style={{color: isBudget ? palette.danger : palette.success}} active name='plus' />
                    </NB.Button>
                  </NB.Left>
                  <NB.Body>
                    <NB.Text>{item.name}</NB.Text>
                  </NB.Body>

                  { !isTooLong && (
                    <NB.Right style={[{paddingRight: 0}, styleRight.right]}>
                      <NB.Badge style={{backgroundColor: 'transparent', paddingLeft: 0}} >
                        <NB.Text style={{color: 'black'}}>
                          {(isBudget || percent > 75)
                            ? thisCurrency.format(avalible)
                            : percent + '%'
                          }
                        </NB.Text>
                      </NB.Badge>
                    </NB.Right>
                  )}

                  <NB.Right style={styleRight.right}>
                    <NB.Badge
                      success={badgeColor === 'success'}
                      warning={badgeColor === 'warning'}
                      danger={badgeColor === 'danger'}
                      style={styleRight.badge}
                    >
                      <NB.Text>
                        {thisCurrency.format(item.amount)}
                      </NB.Text>
                    </NB.Badge>
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
    jars: state.jars,
    catagories: state.catagories,
    unsorted: state.unsorted,
    defaultCurrency: state.defaultCurrency,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createJar: (j) => {
      dispatch(createJar(j))
    },
    updateRepeat: () => {
      dispatch(updateRepeat())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Jars)
