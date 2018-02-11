import React from 'react'
import ReactDOM from "react-dom";
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import dashState from './reducer.js'
import App from './App.jsx'


let store = createStore(dashState)

// render the app into the html document
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('react-app')
)
