import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

export const createBaseApi = (reducerPath, baseUrl, prepareHeaders) =>
  createApi({
    reducerPath,
    baseQuery: fetchBaseQuery({
      baseUrl,
      prepareHeaders,
    }),
    endpoints: () => ({}),
  });
