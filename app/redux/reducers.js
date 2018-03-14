import { persistentReducer } from 'redux-pouchdb'
import Big from 'big.js'

const defaultState = {
  jars: [
    { desc: '', name: 'Travel', amount: 0, burn: 0, catId: 'work', id: 'travel_0', goal: {min: 0, max: 80}, currency: '', repeat: 'M' },
    { desc: '', name: 'Going out', amount: 0, burn: 0, catId: 'fun', id: 'fun_1', goal: {min: 0, max: 150}, currency: '', repeat: 'M' },
    { desc: '', name: 'Clothes', amount: 0, burn: 0, catId: 'fun', id: 'clothes_2', goal: {min: 100, max: 0}, currency: '', repeat: '' },
    { desc: '', name: 'Tax', amount: 0, burn: 0, catId: 'living_expences', id: 'tax_3', goal: {min: 0, max: 100}, currency: '', repeat: 'Q' },
    { desc: '', name: 'Food', amount: 0, burn: 0, catId: 'living_expences', id: 'food_0', goal: {min: 0, max: 250}, currency: '', repeat: 'M' },
  ],
  catagories: [
    { id: 'living_expences', name: 'Living Expences' },
    { id: 'fun', name: 'Leisure' },
    { id: 'work', name: 'Work' },
  ],
  unsorted: 0,
  lastUpdate: [0, 0],
  defaultCurrency: 'USD',
  version: 0,
}

function arrSplice (arr, index, input) {
  arr.splice(index, 1, input)
  return arr
}

const reducers = (state = defaultState, action) => {
  let v = {} // switch statement contains only one underlying block
  switch (action.type) {
    case 'CREATE_JAR':
      state = {
        ...state,
        jars: [...state.jars, action.payload],
      }
      break
    case 'UPDATE_JAR':
      v.index = state.jars.findIndex(j => j.id === action.payload.id)

      state = {
        ...state,
        jars: arrSplice([...state.jars], v.index, action.payload),
      }
      break
    case 'UPDATE_JAR_AMOUNT':
      if (action.payload.id === 'false') {
        state = {
          ...state,
          unsorted: parseFloat(Big(state.unsorted).plus(action.payload.amount).toString()),
        }
      } else {
        v.index = state.jars.findIndex(j => j.id === action.payload.id)
        v.burn = action.payload.amount < 0 ? action.payload.amount : 0

        v.updatedJar = {
          ...state.jars[v.index],
          amount: parseFloat(Big(state.jars[v.index].amount).plus(action.payload.amount).toString()),
          burn: parseFloat(Big(state.jars[v.index].burn).plus(v.burn).toString()),
        }

        state = {
          ...state,
          jars: arrSplice([...state.jars], v.index, v.updatedJar),
        }
      }
      break
    case 'UPDATE_JAR_AMOUNT_UNSORTED':
      v.index = state.jars.findIndex(j => j.id === action.payload.id)

      v.updatedJar = {
        ...state.jars[v.index],
        amount: parseFloat(action.payload.amount),
      }

      state = {
        ...state,
        jars: arrSplice([...state.jars], v.index, v.updatedJar),
        unsorted: parseFloat(Big(state.unsorted).plus(state.jars[v.index].amount).minus(action.payload.amount)),
      }
      break
    case 'DELETE_JAR':
      state = {
        ...state,
        jars: state.jars.filter(obj => obj.id !== action.payload.id),
      }
      break
    case 'UPDATE_REPEAT_FULFILLED':
      if (action.payload !== null) {
        const { newJars, newUnsorted, newLastUpdate } = action.payload
        state = {
          ...state,
          jars: newJars,
          unsorted: newUnsorted,
          lastUpdate: newLastUpdate,
        }
      }
      break
    case 'UPDATE_DEFAULT_CURRENCY':
      state = {
        ...state,
        defaultCurrency: action.payload,
      }
      break
  }
  return state
}

export default persistentReducer(reducers)
