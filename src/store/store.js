import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';

const middleWares = [
	thunk,
	logger
];

export const store = configureStore({
	reducer    : rootReducer,
	middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(middleWares)
});
