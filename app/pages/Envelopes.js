import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createEnvelope, updateEnvelope, updateEnvelopeAmount, deleteEnvelope } from '../actions/envelopes'
import PropTypes from 'prop-types'
import {
  Alert,
  StyleSheet,
  SectionList,
} from 'react-native'
import * as NB from 'native-base'

import StyleGlobals from '../styles/Globals'

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
  static contextTypes = {
    uiTheme: PropTypes.object.isRequired,
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
    updateEnvelope: PropTypes.func.isRequired,
    updateEnvelopeAmount: PropTypes.func.isRequired,
    deleteEnvelope: PropTypes.func.isRequired,
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
    const { palette } = this.context.uiTheme

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
              <NB.H2>Envelope Budget</NB.H2>
            </NB.Body>
            <NB.Right>
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
                <NB.Text>{section.title}</NB.Text>
              </NB.Separator>
            )}
            renderItem={({item, index}) => (
              <NB.SwipeRow
                leftOpenValue={75}
                rightOpenValue={-75}
                left={
                  <NB.Button success onPress={() => Alert.alert('Add')}>
                    <NB.Icon active name='add' />
                  </NB.Button>
                }
                body={
                  <NB.Grid>
                    <NB.Col>
                      <NB.Button transparent
                      >
                        <NB.Icon name='info' />
                      </NB.Button>
                    </NB.Col>
                    <NB.Col>
                      <NB.Text>{item.name}</NB.Text>
                    </NB.Col>
                    <NB.Col>
                      {(item.amount < -15)
                        ? <NB.Badge danger><NB.Text>{item.amount}</NB.Text></NB.Badge>
                        : (item.amount > 15)
                          ? <NB.Badge success><NB.Text>{item.amount}</NB.Text></NB.Badge>
                          : <NB.Badge style={{backgroundColor: 'transparent'}} ><NB.Text style={{color: 'black'}}>{item.amount}</NB.Text></NB.Badge>}
                    </NB.Col>
                  </NB.Grid>
                }
                right={
                  <NB.Button danger onPress={() => Alert.alert('Trash')}>
                    <NB.Icon active name='trash' />
                  </NB.Button>
                }
              />
            )}
          />
        </NB.Content>
      </NB.Container>
    )
  }
}
// <ActionButton
// icon='add'
// onPress={() => navigation.navigate('AddTransaction', {
//   onSubmit: (obj) => this.props.updateEnvelopeAmount(obj),
// })}
// />

const styles = StyleSheet.create({
  BudgetListButtonR: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  BudgetListButtonRNumber: {
    padding: 5,
    borderRadius: 5,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10,
  },
})

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
    updateEnvelope: (e) => {
      dispatch(updateEnvelope(e))
    },
    updateEnvelopeAmount: (e) => {
      dispatch(updateEnvelopeAmount(e))
    },
    deleteEnvelope: (id) => {
      dispatch(deleteEnvelope(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Envelopes)
