import { useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/Global';
import theme from './styles/Themes';
import ACCOUNT_PATH from './router/path/Account';
import USER_PATH from './router/path/User';

function App() {
  const queryClient = new QueryClient();
  const routes = useRoutes([...ACCOUNT_PATH, ...USER_PATH]);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        {routes}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
