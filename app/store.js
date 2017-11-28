import { createStore, combineReducers, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'

import counterReducer from './reducers/counterReducer'

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
