import { persistentReducer } from 'redux-pouchdb'

const defaultState = {
  defaultCurrency: '',
}

const settings = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_DEFAULT_CURRENCY':
      state = {
        ...state,
        defaultCurrency: action.payload,
      }
      break
  }

  return state
}

export default persistentReducer(settings)
