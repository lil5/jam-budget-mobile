import { createStore, compose, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'

// pouchdb
import { persistentStore } from 'redux-pouchdb'
import Database from './database'

// reducers
import reducers from './redux/reducers'

export default createStore(
  reducers,
  // {}, // only neccasary for multiple reducers
  compose(
    applyMiddleware(
      createLogger({}),
      thunk,
      promiseMiddleware(),
    ),
    persistentStore(Database.db),
  )
)
