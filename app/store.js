import { createStore, combineReducers, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import envelopes from './reducers/envelopes'

export default createStore(
  combineReducers({
    envelopes,
  }),
  {},
  applyMiddleware(logger, thunk, promise())
)
