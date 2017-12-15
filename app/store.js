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
import { persistentStore } from 'redux-pouchdb'
import Database from './database'

export default password => {
  Database.setPassword(password)

  return createStore(
    combineReducers({
      counterReducer,
      counterPouchReducer,
    }),
    {},
    compose(
      persistentStore(Database.db),
      applyMiddleware(
        logger,
        thunk,
      )
    )
  )
}
