import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import rootReducer from './root.reducer';

// Assign 'logger' component/function to an array
const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
// Persist Redux state data in local storage
export const persistor = persistStore(store);

export default { store, persistor };
