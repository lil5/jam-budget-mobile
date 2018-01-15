import { persistentReducer } from 'redux-pouchdb'

// const defaultState = {
//   data: [{ name: 'Budget item', amount: 0, catId: 0, id: 0 }],
//   catagories: ['Catagory'],
// }
const defaultState = {
  data: [
    { name: 'Travel', amount: 400, catId: 'work', id: 'travel_0' },
    { name: 'Going out', amount: -40, catId: 'fun', id: 'fun_1' },
    { name: 'Clothes', amount: 30.39, catId: 'fun', id: 'clothes_2' },
    { name: 'Rent', amount: 400, catId: 'living_expences', id: 'rent_3' },
    { name: 'Food Shopping', amount: 3, catId: 'living_expences', id: 'food_0' },
  ],
  catagories: [
    { id: 'living_expences', name: 'Living Expences' },
    { id: 'fun', name: 'Leisure' },
    { id: 'work', name: 'Work' },
  ],
}

const envelopes = (state = defaultState, action) => {
  switch (action.type) {
    case 'CREATE_ENVELOPE':
      state = {
        ...state,
        data: [...state.data, action.payload],
        // data: state.data.push(action.payload),
      }
      break
    case 'UPDATE_ENVELOPE':
      const id = state.data.findIndex(el => el.id === action.payload.id)

      state = {
        ...state,
        date: state.data.splice(id, 1, action.payload),
      }
      break
    case 'DELETE_ENVELOPE':
      state = {
        ...state,
        data: state.data.filter(obj => obj.id !== action.payload),
      }
      break
  }
  return state
}
export default persistentReducer(envelopes)
