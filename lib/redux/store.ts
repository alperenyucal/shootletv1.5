import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import authReducer from './auth/authSlice';
// import detailsFormReducer from './detailsForm/detailsFromSlice';
// import eventFormReducer from './event/eventFormSlice';

const reducers = combineReducers({
  auth: authReducer,
  // eventForm: eventFormReducer,
  // showDetailsForm: detailsFormReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;

export default store;
