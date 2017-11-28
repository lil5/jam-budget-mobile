const defaultState = { counter: 1 }

const counterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'COUNTER_ADD':
      state = {
        ...state,
        counter: state.counter + action.payload,
      }
      break
    case 'COUNTER_REMOVE':
      state = {
        ...state,
        counter: state.counter - action.payload,
      }
      break
  }
  return state
}

export default counterReducer
