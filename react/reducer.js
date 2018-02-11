

const dashStore = (state = {working: 'false'}, action) => {
  switch (action.type) {
    case 'SET_WORKING':
      return {
        ...state,
        working: 'true'
    }
    default:
      return state
  }
}

export default dashStore
