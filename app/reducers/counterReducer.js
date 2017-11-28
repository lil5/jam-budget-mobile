const defaultState = { counter: 1 }

const counterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'COUNTER_ADD':
      if (!state.counter) state = {counter: 1}
      state = {
        counter: state.counter + action.payload,
        ...state,
      }
      break
    case 'COUNTER_REMOVE':
      if (!state.counter) state = {counter: 1}
      state = {
        counter: state.counter - action.payload,
        ...state,
      }
      break
  }
  return state
}

export default counterReducer
