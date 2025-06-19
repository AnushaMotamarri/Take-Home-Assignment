import { createBaseApi } from '../rtkQuery/createBaseApi';

export const walletApi = createBaseApi(
  'walletApi',
  'https://deep-index.moralis.io/api/v2',
  headers => {
    headers.set('X-API-Key', import.meta.env.VITE_MORALIS_API_KEY);
    return headers;
  }
);

walletApi.injectEndpoints({
  endpoints: builder => ({
    getWalletInfoByBlockChain: builder.query({
      query: ({ walletId, blockChain }) => {
        return `${walletId}/erc20?chain=${blockChain}`;
      },
    }),
  }),
});

export const { useGetWalletInfoByBlockChainQuery, useLazyGetWalletInfoByBlockChainQuery } =
  walletApi; // ✅ CORRECT!
