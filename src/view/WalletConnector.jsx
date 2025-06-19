// components/WalletConnector.jsx
import { useEffect, useState } from 'react';
import useWallet from '../hooks/useWallet';

const MORALIS_API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImM1MzgyODVkLTI0ZDItNGM2Yy1iYTUzLTJhOTU5YzhmYmIxOSIsIm9yZ0lkIjoiNDU0NzQ5IiwidXNlcklkIjoiNDY3ODc5IiwidHlwZUlkIjoiNzI0YmJmN2YtNjY5Yy00MDliLWExZTMtYTQxZDkzZjU1ZTBkIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NTAzMjIxMDUsImV4cCI6NDkwNjA4MjEwNX0.cAep9PqcLzH5R_4vVpe0yHM0jMWf3rQKuVDnrRHkymE'; // Replace with env var for security

export default function WalletConnector() {
  const { account, connectWallet, error } = useWallet();
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAssets = async walletAddress => {
    if (!walletAddress) return;

    try {
      setLoading(true);
      const res = await fetch(
        `https://deep-index.moralis.io/api/v2/${walletAddress}/erc20?chain=eth`,
        {
          headers: {
            'X-API-Key': MORALIS_API_KEY,
          },
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to fetch assets');
      }

      const data = await res.json();
      console.log(data); // Token data
      setTokens(data);
    } catch (err) {
      console.error('Asset fetch failed:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (account) {
      fetchAssets(account);
    }
  }, [account]);

  return (
    <div className="p-4 border rounded-md max-w-md mx-auto">
      {account ? (
        <div>
          <p className="text-green-600">
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </p>
          {loading ? (
            <p>Loading tokens...</p>
          ) : (
            <ul className="mt-2 space-y-1">
              {!tokens?.length && <div>No Tokens found!</div>}
              {tokens.map(token => (
                <li key={token.token_address} className="text-sm text-gray-700">
                  {token.name} ({token.symbol}) - {Number(token.balance) / 10 ** token.decimals}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <button onClick={connectWallet} className="!bg-primary text-white px-4 py-2 rounded">
          Connect Wallet
        </button>
      )}

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
