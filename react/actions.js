import sendAjax from './api'

let response = sendAjax({'message': 'hey'})

export const setWorking = () => {
    return {
        type: 'SET_WORKING',
        value: response.message
    }
}
