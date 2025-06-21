import { useState, useMemo, useEffect } from 'react';
import { ethers } from 'ethers';
import { useGetWalletInfoByBlockChainQuery } from '../services/walletApi';
import { skipToken } from '@reduxjs/toolkit/query';
const walletId = import.meta.env.VITE_WALLET_ID;
export default function useWallet() {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');
  const {
    data: tokens = [],
    isFetching,
    error: queryError,
  } = useGetWalletInfoByBlockChainQuery(
    account ? { walletId: walletId, blockChain: 'eth' } : skipToken
  );
  const [isLoading, setIsLoading] = useState(false);

  const [enrichedTokens, setEnrichedTokens] = useState([]);
  const totalBalance = useMemo(() => {
    return enrichedTokens.reduce((sum, token) => sum + (token.usdValue || 0), 0);
  }, [enrichedTokens]);
  const readableTokens = useMemo(
    () =>
      tokens.map(token => ({
        ...token,
        readableBalance: Number(token.balance) / 10 ** token.decimals,
      })),
    [tokens]
  );
  useEffect(() => {
    if (!readableTokens.length) return;
    setIsLoading(true);
    const COINGECKO_LIST_KEY = 'cg_supported_tokens';

    const fetchSupportedTokenMap = async () => {
      const cached = localStorage.getItem(COINGECKO_LIST_KEY);
      if (cached) return JSON.parse(cached);

      const res = await fetch('https://api.coingecko.com/api/v3/coins/list?include_platform=true');
      const data = await res.json();

      const tokenMap = {};
      data.forEach(token => {
        const ethAddr = token.platforms?.ethereum?.toLowerCase();
        if (ethAddr) {
          tokenMap[ethAddr] = token.id;
        }
      });

      localStorage.setItem(COINGECKO_LIST_KEY, JSON.stringify(tokenMap));
      return tokenMap;
    };

    const getValidTokensWithPrices = async tokens => {
      const supportedMap = await fetchSupportedTokenMap();

      // Filter to tokens supported by CoinGecko
      const valid = tokens
        .filter(token => supportedMap[token.token_address.toLowerCase()])
        .map(token => {
          const coinId = supportedMap[token.token_address.toLowerCase()];
          return {
            ...token,
            coinGeckoId: coinId,
          };
        });

      if (!valid.length) return [];

      // Batch fetch price by ids (CoinGecko supports up to 250 ids)
      const ids = valid.map(t => t.coinGeckoId).join(',');
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
      );
      const priceMap = await res.json();

      const enriched = valid.map(token => {
        const usdPrice = priceMap[token.coinGeckoId]?.usd || 0;
        const readableBalance = Number(token.balance) / 10 ** token.decimals;
        return {
          ...token,
          readableBalance,
          usdPrice,
          usdValue: usdPrice * readableBalance,
        };
      });

      return enriched;
    };

    getValidTokensWithPrices(readableTokens).then(val => {
      setEnrichedTokens(val);
      setIsLoading(false);
    });
  }, [readableTokens]);
  const connectWallet = async () => {
    setError('');
    try {
      if (!window.ethereum) {
        setError('MetaMask not installed');
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setAccount(accounts[0]);
    } catch {
      setError('Connection failed');
    }
  };

  return {
    account,
    connectWallet,
    error: error || queryError,
    totalBalance,
    isLoading: isFetching || isLoading,
    enrichedTokens,
  };
}
