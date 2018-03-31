// import sendAjax from '../../app/renderer.js'
//
// let response = sendAjax({'message': 'hey'})
//
export const setUser = user => (dispatch, getState) => {
     console.log(`setting user to ${user.displayName}`)
    dispatch({
        type: 'SET_USER',
        user: user
    })
}
