import { atom } from 'recoil';
import { Account } from '../../types/AccountType';

export const accountsState = atom<Account[]>({
  key: 'accountsState',
  default: [],
});
