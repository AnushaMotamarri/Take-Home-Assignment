import { useEffect, useState, useMemo } from 'react';
import { getCache, setCache } from '../utils/cache';
import { skipToken } from '@reduxjs/toolkit/query';
import { valueToDaysMap } from '../view/enums';
import { debounce } from '../utils/common_utils';
import {
  useLazyGetCoinsListQuery,
  useGetMarketChartQuery,
  useLazyGetTopCoinsQuery,
} from '../services/cryptoApi';
const COINS_CACHE_KEY = 'top_coins';

const useCoinsInfo = () => {
  const [topCoins, setTopCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [getTopCoins, { error: topCoinsError }] = useLazyGetTopCoinsQuery();
  const [getCoinsList, { error: fetchCoinsError }] = useLazyGetCoinsListQuery();
  const [selectedCoinInfo, setSelectedCoinInfo] = useState();
  const [selectedDays, setSelectedDays] = useState();
  const [selectedCompareCoinInfo, setSelectedCompareCoinInfo] = useState();
  const [selectedMetricInfo, setSelectedMetricInfo] = useState();
  const [selectedTimeRange, setSelectedTimeRange] = useState();
  const marketChartQueryArgs = useMemo(() => {
    return selectedCoinInfo?.id ? { id: selectedCoinInfo.id, days: selectedDays || 7 } : skipToken;
  }, [selectedCoinInfo, selectedDays]);

  const compareChartQueryArgs = useMemo(() => {
    return selectedCompareCoinInfo?.id
      ? { id: selectedCompareCoinInfo.id, days: selectedDays || 7 }
      : skipToken;
  }, [selectedCompareCoinInfo, selectedDays]);

  const {
    data: compareChartResponseRaw,
    isFetching: isCompareChartLoading,
    error: compareChartError,
  } = useGetMarketChartQuery(compareChartQueryArgs, {
    refetchOnMountOrArgChange: false,
  });

  const {
    data: chartResponseRaw,
    isFetching,
    error: marketChartError,
  } = useGetMarketChartQuery(marketChartQueryArgs, {
    refetchOnMountOrArgChange: false,
  });
  const chartResponse = marketChartError ? [] : chartResponseRaw || [];
  const compareChartResponse = compareChartError ? [] : compareChartResponseRaw || [];
  const fetchTopCoins = async () => {
    const cached = getCache(COINS_CACHE_KEY);
    if (cached) {
      setTopCoins(cached);
      setLoading(false);
      return;
    }
    try {
      const { data } = await getTopCoins();
      setTopCoins(data);
      setCache(COINS_CACHE_KEY, data);
    } catch {
      setError('Oops! An error occured.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTopCoins();
  }, []);
  useEffect(() => {
    if (fetchCoinsError || marketChartError || topCoinsError || compareChartError) {
      setError('Error Occured while fetching the data.');
    }
  }, [fetchCoinsError, marketChartError, topCoinsError, compareChartError]);
  const loadOptions = async (inputValue, callback) => {
    if (!inputValue) return callback([]);
    const { data } = await getCoinsList({ searchQuery: inputValue });
    const { coins } = data;
    const options = coins.map(coin => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.thumb,
    }));
    callback(options || []);
  };
  const debouncedLoadOptions = useMemo(() => debounce(loadOptions, 500), []);

  const handleCoinSelection = coinData => {
    setSelectedCoinInfo(coinData);
  };

  const handleCompareCoinSelection = coinData => {
    setSelectedCompareCoinInfo(coinData);
  };
  const onTimeRangeChange = doc => {
    if (doc?.value) {
      setSelectedTimeRange(doc);
      setSelectedDays(valueToDaysMap[doc?.value]);
    }
  };

  const onMetricChange = doc => {
    setSelectedMetricInfo(doc);
  };

  return {
    topCoins,
    loading,
    error,
    debouncedLoadOptions,
    handleCoinSelection,
    chartResponse,
    isChartLoading: isFetching,
    selectedCoinInfo,
    onTimeRangeChange,
    handleCompareCoinSelection,
    compareChartResponse,
    isCompareChartLoading,
    selectedCompareCoinInfo,
    onMetricChange,
    selectedMetricInfo,
    selectedTimeRange,
  };
};

export { useCoinsInfo };
