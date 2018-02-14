import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createEnvelope } from '../actions/envelopes'
import PropTypes from 'prop-types'
import { SectionList } from 'react-native'
import * as NB from 'native-base'

class Envelopes extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  componentWillMount () {
    this.setState({
      isToBeBudgetted: false,
      searchText: '',
      isSearching: false,
    })
  }

  static navigationOptions = {
    header: null,
  }
  static propTypes = {
    // rn navigation
    navigation: PropTypes.object.isRequired,
    // redux store
    envelopes: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        catId: PropTypes.string,
        desc: PropTypes.string,
        amount: PropTypes.number,
        goal: PropTypes.object,
      })),
      catagories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })),
    }),
    // redux actions
    createEnvelope: PropTypes.func.isRequired,
  }

  renderToBeBudgeted () {
    return (
      <NB.Text>hi</NB.Text>
    )
  }

  renderList () {
    const { data, catagories } = this.props.envelopes
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
    const { navigation, envelopes } = this.props

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
                  catagories: envelopes.catagories,
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
          {this.state.isToBeBudgetted && this.renderToBeBudgeted()}

          <SectionList
            keyExtractor={(item, index) => item.id}
            sections={this.renderList()}
            renderSectionHeader={({section}) => (
              <NB.Separator bordered>
                <NB.Text>{section.title.toUpperCase()}</NB.Text>
              </NB.Separator>
            )}
            renderItem={({item, index}) => {
              const avalible = item.amount + item.goal.max
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
                  { item.goal.max > 0 &&
                  <NB.Right style={{width: 70}}>
                    <NB.Badge style={{backgroundColor: 'transparent'}} ><NB.Text style={{color: 'black'}}>{item.burn + item.goal.max}</NB.Text></NB.Badge>
                  </NB.Right>}
                  <NB.Right style={{width: 70}}>
                    {(avalible < -5)
                      ? <NB.Badge danger><NB.Text>{item.amount}</NB.Text></NB.Badge>
                      : (avalible > 5)
                        ? <NB.Badge
                          success={item.amount >= 0}
                          warning={item.amount < 0}
                        ><NB.Text>{item.amount}</NB.Text></NB.Badge>
                        : <NB.Badge style={{backgroundColor: 'transparent'}} ><NB.Text style={{color: 'black'}}>{item.amount}</NB.Text></NB.Badge>}
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
    envelopes: state.envelopes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createEnvelope: (e) => {
      dispatch(createEnvelope(e))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Envelopes)
