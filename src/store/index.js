import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
import { contactReducer } from './reducers/contact.reducer'
import { userReducer } from './reducers/user.reducer'
import { bitcoinReducer } from './reducers/bitcoin.reducer.js'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    contactModule: contactReducer,
    userModule: userReducer,
    bitcoinModule: bitcoinReducer

})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// window.gStore = store