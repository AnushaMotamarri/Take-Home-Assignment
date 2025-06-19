import NotFound from './components/notFound';
import WalletConnector from './view/WalletConnector';
import CryptoAssetTracker from './view/cryptoAssetTracker';
import Layout from './view/layout';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <CryptoAssetTracker /> },
      {
        path: 'connectWallet',
        children: [{ path: '', element: <WalletConnector /> }],
      },
    ],
  },

  { path: '*', element: <NotFound /> },
];

export default routes;
