

const dashStore = (state = {user: 'hello'}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user.email
    }
    default:
      return state
  }
}

export default dashStore
