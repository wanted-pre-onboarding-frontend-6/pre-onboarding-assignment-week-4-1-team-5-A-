import { useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import GlobalStyle from './styles/Global';
import { RecoilRoot } from 'recoil';
import userStorage from './utils/userStorage';
import Routes from './router';

function App() {
  const queryClient = new QueryClient();
  const token = userStorage.get();
  const isAuth = token !== null ? true : false;
  const routes = useRoutes(Routes(isAuth));

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <CssBaseline />
        <RecoilRoot>{routes}</RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
