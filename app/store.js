import { createStore, compose } from 'redux'
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
  // {}, // only neccasary for multiple reducers
  compose(
    persistentStore(Database.db)
  )
)
