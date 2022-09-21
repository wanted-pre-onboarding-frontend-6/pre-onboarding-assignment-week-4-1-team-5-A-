import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Account from './pages/account';

function Router() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Account />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default Router;
