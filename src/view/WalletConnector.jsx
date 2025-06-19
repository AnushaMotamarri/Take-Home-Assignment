import useWallet from '../hooks/useWallet';
import Table from '../components/table';
import { walletColumnConfigs } from './enums';
import React from 'react';
import { useGetWalletInfoByBlockChainQuery } from '../services/walletApi';
import { skipToken } from '@reduxjs/toolkit/query';
const walletId = import.meta.env.VITE_WALLET_ID;
export default function WalletConnector() {
  const { account, connectWallet, error } = useWallet();
  const {
    data: tokens = [],
    isFetching,
    isError,
    error: queryError,
  } = useGetWalletInfoByBlockChainQuery(
    account ? { walletId: walletId, blockChain: 'eth' } : skipToken
  );

  const formattedTokens = tokens.map(token => ({
    ...token,
    readableBalance: Number(token.balance) / 10 ** token.decimals,
  }));

  return (
    <div className="p-4">
      <h2 className="text-xl xtext-text-color">
        <b>Connect your self-custody Wallet</b>
      </h2>
      <p className="text-sm py-1">
        Connect your self-custody wallet like MetaMask or Trust Wallet to view and monitor your
        ERC-20 token holdings in real-time. Instantly see your token balances, symbol, and asset
        details fetched from the blockchain.
      </p>
      <div>
        <span className="text-sm py-1">
          <b>Pre-Requisite: </b>You need to have a self-custody wallet browser extension (like
          MetaMask) installed on Chrome.
        </span>
      </div>
      {account ? (
        <div>
          <p className="text-green-600">
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </p>
          {isFetching ? (
            <p>Loading tokens...</p>
          ) : isError ? (
            <p className="text-red-600">Error: {queryError?.message}</p>
          ) : (
            <Table tokens={formattedTokens} tableConfigs={walletColumnConfigs} />
          )}
        </div>
      ) : (
        <button onClick={connectWallet} className="!bg-primary my-2 text-white px-4 py-2 rounded">
          Connect Wallet
        </button>
      )}

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
