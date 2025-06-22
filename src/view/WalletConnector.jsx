import useWallet from '../hooks/useWallet';
import Table from '../components/table';
import { walletColumnConfigs } from './enums';
import React from 'react';

export default function WalletConnector() {
  const { account, connectWallet, error, totalBalance, isLoading, enrichedTokens } = useWallet();
  console.log(error);
  return (
    <div className="p-4">
      <h2 className="text-xl xtext-text-color">
        <b>Connect your self-custody Wallet</b>
      </h2>
      <p className="text-sm py-1">
        Connect your self-custody wallet like MetaMask or Trust Wallet to view and monitor your
        valid ERC-20 token holdings in real-time. Instantly see your token balances, symbol, and
        asset details fetched from the blockchain.
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
          {isLoading ? (
            <p>Loading tokens...</p>
          ) : error ? (
            <p className="text-red-600">
              Error: {typeof error === 'string' ? error : error?.message || error?.data?.message}
            </p>
          ) : (
            <div>
              <div className="my-5">
                <b>Your Total ETH Balance:</b>{' '}
                <span className="text-green-600">{totalBalance} USD</span>
              </div>
              <Table tokens={enrichedTokens} tableConfigs={walletColumnConfigs} />
            </div>
          )}
        </div>
      ) : (
        <div>
          <button onClick={connectWallet} className="!bg-primary my-2 text-white px-4 py-2 rounded">
            Connect Wallet
          </button>
          {error && <p className="text-red-600">{error}</p>}
        </div>
      )}
    </div>
  );
}
