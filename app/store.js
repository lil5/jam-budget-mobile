import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

// pouchdb
import { persistentStore } from 'redux-pouchdb'
import Database from './database'

// reducers
import envelopes from './reducers/envelopes'

export default createStore(
  combineReducers({
    envelopes,
  }),
  {},
  compose(
    persistentStore(Database.db),
    applyMiddleware(logger, thunk, promise())
  )
)
