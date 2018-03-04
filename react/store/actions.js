// import sendAjax from '../../app/renderer.js'
//
// let response = sendAjax({'message': 'hey'})
//
export const setUser = (user) => {
     console.log(user)
    return {
        type: 'SET_USER',
        user: user
    }
}
