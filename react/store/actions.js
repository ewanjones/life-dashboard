// import sendAjax from '../../app/renderer.js'
//
// let response = sendAjax({'message': 'hey'})
//
export const setUser = user => (dispatch) => {
    console.log(`setting user to ${user.displayName}`)
    dispatch({
        type: 'SET_USER',
        user: user
    })
}

export const setWorking = () => (dispatch) => {
    dispatch({
        type: 'SET_WORKING'
    })
}
