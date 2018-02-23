import {
  createStore,
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
import reducers from './redux/reducers'

export default createStore(
  reducers,
  // {},
  compose(
    persistentStore(Database.db)
  )
)
