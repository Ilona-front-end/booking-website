import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const reducer  = combineReducers({

});

// create store
const store = configureStore({
  reducer,
});

export default store;