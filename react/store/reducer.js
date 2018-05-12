const dashStore = (state = {
    user: 'hello',
    working: false
}, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_WORKING':
            return {
                ...state,
                working: true
            }
        default:
            return state
    }
}

export default dashStore
