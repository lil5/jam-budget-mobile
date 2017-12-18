import { persistentReducer } from 'redux-pouchdb'

// const defaultState = {
//   data: [{ title: 'Budget item', amount: 0, catKey: 0, key: 0 }],
//   catagories: ['Catagory'],
// }
const defaultState = {
  data: [
    { title: 'Food', amount: 400, catKey: 0, key: 0 },
    { title: 'Fun', amount: -40, catKey: 0, key: 1 },
    { title: 'Clothes', amount: 30, catKey: 0, key: 2 },
    { title: 'Rent', amount: 400, catKey: 1, key: 3 },
  ],
  catagories: [
    'Shopping', 'Living Expences',
  ],
}

const envelopes = (state = defaultState, action) => {
  switch (action.type) {
    case 'CREATE_ENVELOPE_FULFILLED':
      state = {
        ...state,
        data: [...state.data, action.payload],
      }
      break
    case 'DELETE_ENVELOPE_FULFILLED':
      state = {
        ...state,
        data: state.data.filter(obj => obj.key !== action.payload),
      }
      break
  }
  return state
}
export default persistentReducer(envelopes)
