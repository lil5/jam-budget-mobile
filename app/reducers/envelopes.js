import { persistentReducer } from 'redux-pouchdb'

// const defaultState = {
//   data: [{ name: 'Budget item', amount: 0, catId: 0, id: 0 }],
//   catagories: ['Catagory'],
// }
const defaultState = {
  data: [
    { name: 'Food', amount: 400, catId: 'shopping_0', id: 'food_0' },
    { name: 'Fun', amount: -40, catId: 'shopping_0', id: 'fun_1' },
    { name: 'Clothes', amount: 30.39, catId: 'shopping_0', id: 'clothes_2' },
    { name: 'Rent', amount: 400, catId: 'living_expences_ 1', id: 'rent_3' },
  ],
  catagories: [
    { id: 'shopping_0', name: 'Shopping' },
    { id: 'living_expences_ 1', name: 'Living Expences' },
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
        data: state.data.filter(obj => obj.id !== action.payload),
      }
      break
  }
  return state
}
export default persistentReducer(envelopes)
