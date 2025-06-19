import { useState } from 'react';
import { ethers } from 'ethers';

export default function useWallet() {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');

  const connectWallet = async () => {
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

  return { account, connectWallet, error };
}
