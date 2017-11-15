import React, { Component } from 'react'
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

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      budgetList: [
        {
          title: 'Catagory',
          data: [
            { title: 'Budget item', amount: 0 },
          ],
        },
      ],
    }
  }

  componentWillMount () {
    this.setState({ budgetList: [
      {
        title: 'Immediate Obligations',
        data: [
          { title: 'Rent', amount: 300 },
        ],
      },
    ]})
  }

  static navigationOptions = {
    header: null,
    drawerIcon: ({tintColor}) => (<Icon name='drafts' color={tintColor} />),
  }
  static propTypes = {
    navigation: PropTypes.object.isRequired,
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
            placeholder: 'Search',
            onChangeText: value => this.setState({ searchText: value }),
            onSearchClosed: () => this.setState({ searchText: '' }),
          }}
        />

        <View style={[StyleGlobals.Stretch]}>
          <SectionList
            sections={this.state.budgetList}
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
