import { useLocation } from 'react-router-dom';

export const useParamString = () => {
  const params = useLocation().pathname.split('/');
  const LIST_PATH = params[1];
  return { LIST_PATH };
};
