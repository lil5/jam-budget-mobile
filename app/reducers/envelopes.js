import { persistentReducer } from 'redux-pouchdb'

// const defaultState = {
//   data: [{ name: 'Budget item', amount: 0, catId: 0, id: 0 }],
//   catagories: ['Catagory'],
// }
const defaultState = {
  data: [
    { name: 'Travel', amount: 400, catId: 'work', id: 'travel_0', goal: {min: 0, max: 0} },
    { name: 'Going out', amount: -40, catId: 'fun', id: 'fun_1', goal: {min: 0, max: 0} },
    { name: 'Clothes', amount: 30.39, catId: 'fun', id: 'clothes_2', goal: {min: 0, max: 0} },
    { name: 'Rent', amount: 400, catId: 'living_expences', id: 'rent_3', goal: {min: 0, max: 0} },
    { name: 'Food Shopping', amount: 3, catId: 'living_expences', id: 'food_0', goal: {min: 0, max: 0} },
  ],
  catagories: [
    { id: 'living_expences', name: 'Living Expences' },
    { id: 'fun', name: 'Leisure' },
    { id: 'work', name: 'Work' },
  ],
}

function arrSplice (arr, index, input) {
  arr.splice(index, 1, input)
  return arr
}

const envelopes = (state = defaultState, action) => {
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

      } else {
        index = state.data.findIndex(el => el.id === action.payload.id)

        let updatedEnvelope = {
          ...state.data[index],
          amount: state.data[index].amount + action.payload.amount,
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
  }
  return state
}
export default persistentReducer(envelopes)
