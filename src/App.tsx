import { useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import GlobalStyle from './styles/Global';
import ACCOUNT_PATH from './router/path/Account';
import USER_PATH from './router/path/User';

function App() {
  const queryClient = new QueryClient();
  const routes = useRoutes([...ACCOUNT_PATH, ...USER_PATH]);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <CssBaseline />
        {routes}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
