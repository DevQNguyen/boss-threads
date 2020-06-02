import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root.reducer';

// Assign 'logger' component/function to an array
const middlewares = [logger];

// Create a store and connect it to rootReduce and middlewares
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
