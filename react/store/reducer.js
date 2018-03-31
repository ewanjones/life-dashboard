const dashStore = (state = {user: 'hello'}, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                user: action.user
            }
        default:
            return state
    }
}

export default dashStore
