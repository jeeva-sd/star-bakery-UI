import { combineReducers } from '@reduxjs/toolkit';
import orderReducer from './orderReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    order: orderReducer,
});

export default rootReducer;
