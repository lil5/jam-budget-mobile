import { applyMiddleware } from 'redux'
import { AsyncStorage } from 'react-native'
import reduxRemember from 'redux-remember'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'

// reducers
import counterReducer from './reducers/counterReducer'

const { createStore, combineReducers } = reduxRemember(AsyncStorage)

export default createStore(
  combineReducers({
    counterReducer,
  }),
  {},
  applyMiddleware(
    logger,
    thunk,
  )
)
