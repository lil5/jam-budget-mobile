import { persistentReducer } from 'redux-pouchdb'
import Big from 'big.js'

const defaultState = {
  data: [
    { desc: '', name: 'Travel', amount: 0, burn: 0, catId: 'work', id: 'travel_0', goal: {min: 0, max: 0}, currency: '', reaccuring: 'Y' },
    { desc: '', name: 'Going out', amount: 0, burn: 0, catId: 'fun', id: 'fun_1', goal: {min: 0, max: 0}, currency: '', reaccuring: 'M' },
    { desc: '', name: 'Clothes', amount: 0, burn: 0, catId: 'fun', id: 'clothes_2', goal: {min: 0, max: 0}, currency: '', reaccuring: '' },
    { desc: '', name: 'Rent', amount: 0, burn: 0, catId: 'living_expences', id: 'rent_3', goal: {min: 0, max: 0}, currency: '', reaccuring: 'M' },
    { desc: '', name: 'Food Shopping', amount: 0, burn: 0, catId: 'living_expences', id: 'food_0', goal: {min: 0, max: 0}, currency: '', reaccuring: 'M' },
  ],
  catagories: [
    { id: 'living_expences', name: 'Living Expences' },
    { id: 'fun', name: 'Leisure' },
    { id: 'work', name: 'Work' },
  ],
  unsorted: 0,
  lastUpdate: [0, 0],
  defaultCurrency: '',
}

function arrSplice (arr, index, input) {
  arr.splice(index, 1, input)
  return arr
}

const reducers = (state = defaultState, action) => {
  let index
  switch (action.type) {
    case 'CREATE_ENVELOPE':
      state = {
        ...state,
        data: [...state.data, action.payload],
        // data: state.data.push(action.payload),
      }
      break
    case 'UPDATE_ENVELOPE':
      index = state.data.findIndex(el => el.id === action.payload.id)

      state = {
        ...state,
        data: arrSplice([...state.data], index, action.payload),
      }
      break
    case 'UPDATE_ENVELOPE_AMOUNT':
      if (action.payload.id === 'false') {
        state = {
          ...state,
          unsorted: parseFloat(Big(state.unsorted).plus(action.payload.amount).toString()),
        }
      } else {
        index = state.data.findIndex(el => el.id === action.payload.id)
        const burn = action.payload.amount < 0 ? action.payload.amount : 0

        let updatedEnvelope = {
          ...state.data[index],
          amount: parseFloat(Big(state.data[index].amount).plus(action.payload.amount).toString()),
          burn: parseFloat(Big(state.data[index].burn).plus(burn).toString()),
        }

        state = {
          ...state,
          data: arrSplice([...state.data], index, updatedEnvelope),
        }
      }
      break
    case 'DELETE_ENVELOPE':
      state = {
        ...state,
        data: state.data.filter(obj => obj.id !== action.payload.id),
      }
      break
    case 'UPDATE_REACCURING':
      const today = new Date()

      let isNewYear = today.getUTCFullYear() > state.lastUpdate[0]
      let isNewMonth = isNewYear ? true : today.getUTCMonth() > state.lastUpdate[1]

      if (isNewYear || isNewMonth) { // performance
        const newData = []
        let newUnsorted = Big(state.unsorted)
        state.data.forEach(envelope => {
          if (envelope.currency === '') {
            if ((envelope.reaccuring === 'Y' && isNewYear) ||
          (envelope.reaccuring === 'M' && isNewMonth)) {
            // add unsorted
              newUnsorted = newUnsorted.add(envelope.amount)

              // remove from envelope
              envelope = {
                ...envelope,
                amount: 0,
                burn: 0,
              }
            }
          }
          newData.push(envelope)
        })

        state = {
          ...state,
          data: newData,
          unsorted: parseFloat(newUnsorted.toString()),
          lastUpdate: [today.getUTCFullYear(), today.getUTCMonth()],
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
