import { persistentReducer } from 'redux-pouchdb'

const defaultState = { counterPouch: 1 }

const counterPouchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'COUNTER_POUCH_ADD':
      state = {
        ...state,
        counterPouch: state.counterPouch + action.payload,
      }
      break
    case 'COUNTER_POUCH_REMOVE':
      state = {
        ...state,
        counterPouch: state.counterPouch - action.payload,
      }
      break
  }
  return state
}

export default persistentReducer(counterPouchReducer)
