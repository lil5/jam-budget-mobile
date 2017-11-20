const defaultState = {
  envelopeList: [{
    title: 'Catagory',
    data: [
      { title: 'Budget item', amount: 0 },
    ],
  }],
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'CREATE_ENVELOPE':
      state = {
        ...state,
        envelopeList: [...state.envelopeList, action.payload],
      }
      break
  }
  return state
}
