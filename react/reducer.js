

const dashStore = (state = {working: null}, action) => {
  switch (action.type) {
    case 'SET_WORKING':
      return {
        ...state,
        state: action.value
    }
    default:
      return state
  }
}

export default dashStore
