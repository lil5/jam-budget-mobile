import { persistentReducer } from 'redux-pouchdb'
import Big from 'big.js'

const defaultState = {
  envelopes: [
    { desc: '', name: 'Travel', amount: 0, burn: 0, catId: 'work', id: 'travel_0', goal: {min: 0, max: 80}, currency: '', repeat: 'M' },
    { desc: '', name: 'Going out', amount: 0, burn: 0, catId: 'fun', id: 'fun_1', goal: {min: 0, max: 150}, currency: '', repeat: 'M' },
    { desc: '', name: 'Clothes', amount: 0, burn: 0, catId: 'fun', id: 'clothes_2', goal: {min: 100, max: 0}, currency: '', repeat: '' },
    { desc: '', name: 'Rent', amount: 0, burn: 0, catId: 'living_expences', id: 'rent_3', goal: {min: 1000, max: 0}, currency: '', repeat: 'M' },
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
}

function arrSplice (arr, index, input) {
  arr.splice(index, 1, input)
  return arr
}

const reducers = (state = defaultState, action) => {
  let v = {} // switch statement contains only one underlying block
  switch (action.type) {
    case 'CREATE_ENVELOPE':
      state = {
        ...state,
        envelopes: [...state.envelopes, action.payload],
      }
      break
    case 'UPDATE_ENVELOPE':
      v.index = state.envelopes.findIndex(el => el.id === action.payload.id)

      state = {
        ...state,
        envelopes: arrSplice([...state.envelopes], v.index, action.payload),
      }
      break
    case 'UPDATE_ENVELOPE_AMOUNT':
      if (action.payload.id === 'false') {
        state = {
          ...state,
          unsorted: parseFloat(Big(state.unsorted).plus(action.payload.amount).toString()),
        }
      } else {
        v.index = state.envelopes.findIndex(el => el.id === action.payload.id)
        v.burn = action.payload.amount < 0 ? action.payload.amount : 0

        v.updatedEnvelope = {
          ...state.envelopes[v.index],
          amount: parseFloat(Big(state.envelopes[v.index].amount).plus(action.payload.amount).toString()),
          burn: parseFloat(Big(state.envelopes[v.index].burn).plus(v.burn).toString()),
        }

        state = {
          ...state,
          envelopes: arrSplice([...state.envelopes], v.index, v.updatedEnvelope),
        }
      }
      break
    case 'UPDATE_ENVELOPE_AMOUNT_UNSORTED':
      v.index = state.envelopes.findIndex(el => el.id === action.payload.id)

      v.updatedEnvelope = {
        ...state.envelopes[v.index],
        amount: parseFloat(action.payload.amount),
      }

      state = {
        ...state,
        envelopes: arrSplice([...state.envelopes], v.index, v.updatedEnvelope),
        unsorted: parseFloat(Big(state.unsorted).plus(state.envelopes[v.index].amount).minus(action.payload.amount)),
      }
      break
    case 'DELETE_ENVELOPE':
      state = {
        ...state,
        envelopes: state.envelopes.filter(obj => obj.id !== action.payload.id),
      }
      break
    case 'UPDATE_REPEAT':
      const today = new Date()

      let isNewYear = today.getUTCFullYear() > state.lastUpdate[0]
      let isNewMonth = isNewYear ? true : today.getUTCMonth() > state.lastUpdate[1]
      let isNewQuarter = isNewYear ? true
        : Math.floor((today.getUTCMonth() + 3) / 3) > Math.floor((state.lastUpdate[1] + 3) / 3)

      if (isNewYear || isNewMonth) { // performance
        const newEnvelopes = []
        let newUnsorted = Big(state.unsorted)
        state.envelopes.forEach(envelope => {
          if (envelope.currency === '') {
            if ((envelope.repeat === 'Y' && isNewYear) ||
          (envelope.repeat === 'M' && isNewMonth) ||
        (envelope.repeat === 'Q' && isNewQuarter)) {
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
          newEnvelopes.push(envelope)
        })

        state = {
          ...state,
          envelopes: newEnvelopes,
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
