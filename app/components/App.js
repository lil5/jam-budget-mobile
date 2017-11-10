import React, { Component } from 'react'
import {
  StyleSheet,
  SectionList,
  Text,
  View,
} from 'react-native'
import {
  TouchableWithoutFeedback,
  ActionButton,
  Icon,
  Toolbar,
  Subheader,
  COLOR,
  ListItem,
} from 'react-native-material-ui'



import StyleGlobals from '../styles/Globals'

const instructions = 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      budgetList: [
        {
          title: 'Catagory',
          data: [
            { title: 'Budget item', amount: 0}
          ],
        },
      ]
    }
  }

  componentWillMount () {
    this.setState({ budgetList: [
      {
        title: 'Immediate Obligations',
        data: [
          { title: 'Rent', amount: 300 }
        ],
      },
    ]})
  }

  static navigationOptions = { header: null, }

  render () {
    const { navigate } = this.props.navigation
    const { budgetList } = this.state
    return (
      <View style={StyleGlobals.Stretch}>
        <Toolbar
        leftElement='menu'
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
            renderSectionHeader={({section}) => <Subheader text={section.title}/>}
            renderItem={({item}) => (
              <ListItem
                centerElement={item.title}
                rightElement={(
                  <View style={styles.BudgetListButtonR}>
                    <Text style={[styles.BudgetListButtonRNumber, {backgroundColor: COLOR.red500}]}>{item.amount}</Text>
                    <Icon style={styles.BudgetListButtonRIcon} name='arrow-forward'/>
                    </View>
                )}
              />
            )}
          />
        </View>
        <ActionButton
          icon="add"
          onPress={()=>navigate('InputNumber')}
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
  },
  BudgetListButtonRNumber: {
    padding: 5,
    borderRadius: 5,
    color: 'white',
    fontWeight: 'bold',
  },
  BudgetListButtonRIcon: {
    marginRight: 10,
    marginLeft: 10,
  },
})
