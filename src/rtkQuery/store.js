import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi';
import { walletApi } from '../services/walletApi';
export const store = configureStore({
  reducer: {
    [walletApi.reducerPath]: walletApi.reducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(cryptoApi.middleware, walletApi.middleware),
});
