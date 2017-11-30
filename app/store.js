import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'

import counterReducer from './reducers/counterReducer'
import counterPouchReducer from './reducers/counterPouchReducer'

// pouchdb
import PouchDB from 'pouchdb-react-native'
import { persistentStore } from 'redux-pouchdb'
const db = new PouchDB('localdb')

db.sync('http://127.0.0.1:5984/envelope', { live: true, retry: true })

export default createStore(
  combineReducers({
    counterReducer,
    counterPouchReducer,
  }),
  {},
  compose(
    persistentStore(db),
    applyMiddleware(
      logger,
      thunk,
    )
  )
)
