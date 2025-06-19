import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

export const createBaseApi = (reducerPath, baseUrl) =>
  createApi({
    reducerPath,
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: () => ({}),
  });
