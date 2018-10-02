import { applyMiddleware } from 'redux'
// import logger from 'redux-logger'
import thunk from 'redux-thunk'

// reducers
import reducers from './redux/reducers'

// redux-remember
import reduxRemember from 'redux-remember'
import { AsyncStorage } from 'react-native'

const { createStore, combineReducers } = reduxRemember(AsyncStorage)

export default createStore(
  combineReducers({ remember: reducers }),
  // {}, // only neccasary for multiple reducers
  applyMiddleware(
    // logger,
    thunk,
  )
)
