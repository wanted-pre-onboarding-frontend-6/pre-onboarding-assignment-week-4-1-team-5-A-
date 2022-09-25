import ACCOUNT_PATH from './path/Account';
import USER_PATH from './path/User';

export default function Routes(isAuth: boolean) {
  return [...ACCOUNT_PATH(isAuth), ...USER_PATH(isAuth)];
}
