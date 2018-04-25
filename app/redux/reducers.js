import { persistentReducer } from 'redux-pouchdb'
import Big from 'big.js'
import { defaultState } from './defaults'

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
        stats: { ...state.stats, [action.payload.id]: [] },
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
          unsorted: parseFloat(new Big(state.unsorted).plus(action.payload.amount).toString()),
        }
      } else {
        v.index = state.jars.findIndex(j => j.id === action.payload.id)
        v.burn = action.payload.amount < 0 ? action.payload.amount : 0

        v.updatedJar = {
          ...state.jars[v.index],
          amount: parseFloat(new Big(state.jars[v.index].amount).plus(action.payload.amount).toString()),
          burn: parseFloat(new Big(state.jars[v.index].burn).plus(v.burn).toString()),
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
        unsorted: parseFloat(new Big(state.unsorted).plus(state.jars[v.index].amount).minus(action.payload.amount)),
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
        const {
          newJars,
          newUnsorted,
          newStats,
          newLastUpdate,
        } = action.payload
        state = {
          ...state,
          jars: newJars,
          unsorted: newUnsorted,
          stats: newStats,
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
    case 'UPDATE_REDUX':
      if (state.version === undefined) {
        state = { ...defaultState }
      }
      // v.thisVersion = state.version
      // while (v.thisVersion <= defaultState.version) {
      //   switch (v.thisVersion) {
      //     case 1:
      //
      //       break
      //   }
      // }
      break
  }
  return state
}

export default persistentReducer(reducers)
