import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native'

// redux
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { counterPouchAdd, counterPouchRemove } from '../actions/counterPouchAction'

// database
import Database from '../database'

class ReduxCounter extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  static propTypes = {
    // redux store
    counter: PropTypes.shape({
      counterPouch: PropTypes.number.isRequired,
    }).isRequired,
    // redux actions
    counterPouchAdd: PropTypes.func.isRequired,
    counterPouchRemove: PropTypes.func.isRequired,
  }

  componentWillMount () {
    this.setState({
      ...this.state,
      text: 'Redux Pouch Counter',
      isSyncing: false,
    })
  }

  render () {
    const { counterPouch } = this.props.counter
    return (
      <View style={[styles.container, {flex: 2}]}>
        <Button onPress={() => this.onPressBtn('ADD')} title='add' />
        <Button onPress={() => this.onPressBtn('REMOVE')} title='remove' />
        <Button onPress={() => this.onPressBtn('SYNC')} title='sync' disabled={this.state.isSyncing} />
        <Text style={styles.instructions}>
          {this.state.text}
        </Text>
        <Text style={styles.instructions}>
          {counterPouch}
        </Text>
      </View>
    )
  }

  onPressBtn (payload) {
    switch (payload) {
      case 'ADD':
        this.props.counterPouchAdd(1)
        break
      case 'REMOVE':
        this.props.counterPouchRemove(1)
        break
      case 'SYNC':
        if (this.state.isSyncing === false) {
          this.setState({
            ...this.state,
            isSyncing: !this.state.isSyncing,
          })
          Database.sync()
        }
        break
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

const mapStateToProps = state => ({
  counter: state.counterPouchReducer,
})

const mapDispatchToProps = dispatch => ({
  counterPouchAdd: (a) => {
    dispatch(counterPouchAdd(a))
  },
  counterPouchRemove: (a) => {
    dispatch(counterPouchRemove(a))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxCounter)
