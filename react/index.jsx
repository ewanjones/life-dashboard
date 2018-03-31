import React from 'react'
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'

import { store } from './store/store.js'

import App from './assets/App.jsx'



// render the app into the html document
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('react-app')
)
