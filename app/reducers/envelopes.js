const defaultState = {
  data: [{ title: 'Budget item', amount: 0, catKey: 0, key: 0 }],
  catagories: ['Catagory'],
  loading: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'CREATE_ENVELOPE_FULFILLED':
      state = {
        ...state,
        data: [...state.data, action.payload],
      }
      break
    case 'GET_ENVELOPES_FULFILLED':
      state = {
        ...state,
        data: action.payload.data,
        catagories: action.payload.catagories,
      }
      break
  }
  return state
}
