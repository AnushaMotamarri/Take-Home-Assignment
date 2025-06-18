import Home from './view/home';
import Layout from './view/layout';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [{ path: '', element: <Home /> }],
  },
];

export default routes;
