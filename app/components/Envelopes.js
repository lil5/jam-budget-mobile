import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createEnvelope, getEnvelopes } from '../actions/envelopes'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  SectionList,
  Text,
  View,
} from 'react-native'
import {
  ActionButton,
  Icon,
  Toolbar,
  Subheader,
  COLOR,
  ListItem,
} from 'react-native-material-ui'

import StyleGlobals from '../styles/Globals'

class Envelopes extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    this.props.getEnvelopes()
    this.setState({
      isToBeBudgetted: false,
      searchText: '',
    })
  }

  static navigationOptions = {
    header: null,
    drawerIcon: ({tintColor}) => (<Icon name='drafts' color={tintColor} />),
  }
  static propTypes = {
    // rn navigation
    navigation: PropTypes.object.isRequired,
    // redux store
    envelopes: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        amount: PropTypes.number,
        catKey: PropTypes.number,
        key: PropTypes.number,
      })),
      catagories: PropTypes.arrayOf(PropTypes.string),
    }),
    // redux actions
    getEnvelopes: PropTypes.func,
  }

  renderToBeBudgeted () {
    return (
      <Text>hi</Text>
    )
  }

  // renders an array like this
  // {
  //   title: 'Catagory name',
  //   data: [
  //     { title: 'Rent', amount: 300 },
  //     { title: 'Water', amount: 30 },
  //   ],
  // },
  //
  renderList () {
    const { data, catagories } = this.props.envelopes
    const list = []

    catagories.forEach((cat, catKey) => {
      list.push({title: cat,
        data: data.filter(e => {
          let search = true
          if (this.state.searchText !== '') {
            search = e.title.includes(this.state.searchText)
          }

          return (e.catKey === catKey && search)
        })})
    })

    return list
  }

  render () {
    const { navigation } = this.props
    return (
      <View style={StyleGlobals.Stretch}>
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
        />

        {this.state.isToBeBudgetted && this.renderToBeBudgeted()}

        <View style={[StyleGlobals.Stretch]}>
          <SectionList
            sections={this.renderList()}
            renderSectionHeader={({section}) => <Subheader text={section.title} />}
            renderItem={({item}) => (
              <ListItem
                onPress={() => navigation.navigate('Envelope', {title: item.title})}
                centerElement={item.title}
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
      </View>
    )
    // <InputNumber />
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
    getEnvelopes: () => {
      dispatch(getEnvelopes())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Envelopes)
