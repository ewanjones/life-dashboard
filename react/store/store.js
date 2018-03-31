import { createStore, applyMiddleware } from 'redux'
import dashState from './reducer.js'
import { createLogger } from 'redux-logger'
import { ipcDispatchListener } from '../renderer.js'

// redux logging
const logger = createLogger();

export const store = createStore(
    dashState,
    applyMiddleware(logger)
)

// ipc listener to update state based on ipc messages from main process
ipcDispatchListener(store.dispatch, store.getState)
