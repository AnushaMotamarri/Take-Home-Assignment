import { createBaseApi } from '../rtkQuery/createBaseApi';
import { transformChartData } from '../utils/common_utils';

export const cryptoApi = createBaseApi('cryptoApi', 'https://api.coingecko.com/api/v3');

cryptoApi.injectEndpoints({
  endpoints: builder => ({
    getTopCoins: builder.query({
      query: () => `coins/markets?order=market_cap_desc&vs_currency=usd&per_page=1000`,
    }),
    getCoinsList: builder.query({
      query: ({ searchQuery }) => `search?query=${searchQuery}`,
    }),
    getMarketChart: builder.query({
      query: ({ id, days }) =>
        `coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`,
      transformResponse: response => {
        return transformChartData(response);
      },
    }),
  }),
});

export const {
  useLazyGetTopCoinsQuery,
  useLazyGetCoinsListQuery,
  useLazyGetMarketChartQuery,
  useGetMarketChartQuery,
} = cryptoApi;
