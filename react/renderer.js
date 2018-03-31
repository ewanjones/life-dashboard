// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var ipcRenderer = require('electron').ipcRenderer;
import {setUser} from './store/actions.js'
import { dispatch } from 'redux';
import { store } from './store/store.js'



// ipcRenderer.on('user-data', function(event, user) {
//     console.log(user);
// });


export const ipcDispatchListener = (dispatch, getState) => {
    ipcRenderer.on('user-data', function(event, user) {
        console.log(user);
        dispatch(setUser(user))
    });
}
