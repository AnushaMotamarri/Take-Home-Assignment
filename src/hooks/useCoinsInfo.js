import { useEffect, useState, useMemo } from 'react';
import { getCache, setCache } from '../utils/cache';
import { debounce } from '../utils/common_utils';

const COINS_CACHE_KEY = 'top_coins';

const useCoinsInfo = () => {
  const [topCoins, setTopCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const fetchTopCoins = async () => {
    const cached = getCache(COINS_CACHE_KEY);
    if (cached) {
      setTopCoins(cached);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=1000'
      );
      const data = await res.json();
      setTopCoins(data);
      setCache(COINS_CACHE_KEY, data);
      setLoading(false);
    } catch {
      setError('Oops! An error occured.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTopCoins();
  }, []);
  const loadOptions = async (inputValue, callback) => {
    if (!inputValue) return callback([]);
    const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${inputValue}`);
    const { coins } = await res.json();

    const options = coins.map(coin => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.thumb,
    }));

    callback(options);
    callback(options || []);
  };
  const debouncedLoadOptions = useMemo(() => debounce(loadOptions, 500), []);

  return { topCoins, loading, error, debouncedLoadOptions };
};

export { useCoinsInfo };
