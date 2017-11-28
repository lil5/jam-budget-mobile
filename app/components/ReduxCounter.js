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
import { counterAdd, counterRemove, counterGet } from '../actions/counterAction'

class ReduxCounter extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  static propTypes = {
    // redux store
    counter: PropTypes.number.isRequired,
    // redux actions
    counterAdd: PropTypes.func.isRequired,
    counterRemove: PropTypes.func.isRequired,
  }

  componentWillMount () {
    this.setState({
      ...this.state,
      text: 'Redux Counter',
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Button onPress={() => this.onPressBtn('ADD')} title='add' />
        <Button onPress={() => this.onPressBtn('REMOVE')} title='remove' />
        <Text style={styles.instructions}>
          {this.state.text}
        </Text>
        <Text style={styles.instructions}>
          {this.props.counter}
        </Text>
      </View>
    )
  }

  onPressBtn (payload) {
    switch (payload) {
      case 'ADD':
        this.props.counterAdd(1)
        break
      case 'REMOVE':
        this.props.counterRemove(1)
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
  counter: state.counter,
})

const mapDispatchToProps = dispatch => ({
  counterAdd: (a) => {
    dispatch(counterAdd(a))
  },
  counterRemove: (a) => {
    dispatch(counterRemove(a))
  },
  counterGet: () => {
    dispatch(counterGet())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ReduxCounter)
