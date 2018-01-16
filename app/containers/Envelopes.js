import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createEnvelope, updateEnvelope, deleteEnvelope } from '../actions/envelopes'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  SectionList,
  Text,
  View,
  Alert,
} from 'react-native'
import {
  ActionButton,
  Icon,
  Toolbar,
  Subheader,
  COLOR,
  ListItem,
} from 'react-native-material-ui'
import Container from '../components/Container'

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
    })
  }

  static navigationOptions = {
    header: null,
    drawerIcon: 'drafts',
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
    deleteEnvelope: PropTypes.func.isRequired,
  }

  renderToBeBudgeted () {
    return (
      <Text>hi</Text>
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

  // onSubmit: this.handleEnvelopeNewSubmit,
  // envelope: {},
  render () {
    const { navigation, envelopes } = this.props
    return (
      <Container>
        <Toolbar
          leftElement='menu'
          onLeftElementPress={() => navigation.navigate('DrawerOpen')}
          centerElement='Envelope Budget'
          searchable={{
            autoFocus: true,
            placeholder: 'search',
            onChangeText: value => this.setState({ searchText: value }),
            onSearchClosed: () => this.setState({ searchText: '' }),
          }}
          rightElement='playlist-add'
          onRightElementPress={() => navigation.navigate('EnvelopeEdit', {
            title: 'New Envelope',
            onSubmit: el => this.props.createEnvelope(el),
            catagories: envelopes.catagories,
          })}
        />

        {this.state.isToBeBudgetted && this.renderToBeBudgeted()}

        <View style={[StyleGlobals.Stretch]}>
          <SectionList
            keyExtractor={(item, index) => item.id}
            sections={this.renderList()}
            renderSectionHeader={({section}) => <Subheader text={section.title} />}
            renderItem={({item, index}) => (
              <ListItem
                style={index % 2 === 1 // isOdd
                  ? {container: {backgroundColor: COLOR.grey100}}
                  : {}
                }
                onPress={() => navigation.navigate('Envelope', {
                  envelopeId: item.id,
                })}
                onLongPress={() => this.props.deleteEnvelope(item.id)}
                centerElement={item.name}
                rightElement={(
                  <View style={styles.BudgetListButtonR}>
                    <Text style={[styles.BudgetListButtonRNumber, {backgroundColor: COLOR.red500}]}>{item.amount}</Text>
                    <Icon name='arrow-forward' />
                  </View>
                )}
              />
            )}
          />
        </View>
        <ActionButton
          icon='add'
          onPress={() => navigation.navigate('InputNumber')}
        />
      </Container>
    )
  }
}

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
    deleteEnvelope: (id) => {
      dispatch(deleteEnvelope(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Envelopes)
