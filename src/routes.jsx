import NotFound from './components/notFound';
import CryptoAssetTracker from './view/cryptoAssetTracker';
import Layout from './view/layout';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [{ path: '', element: <CryptoAssetTracker /> }],
  },
  { path: '*', element: <NotFound /> },
];

export default routes;
