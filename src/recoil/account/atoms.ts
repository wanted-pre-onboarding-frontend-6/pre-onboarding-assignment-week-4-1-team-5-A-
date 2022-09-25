import { atom } from 'recoil';
import { Account } from '../../types/AccountType';

export const accountsState = atom<Account[]>({
  key: 'accountsState',
  default: [],
});

export const searchValueState = atom<string>({
  key: 'searchValueState',
  default: '',
});

export const accountsFilterOptionState = atom<string>({
  key: 'accountsFilterOptionState',
  default: 'all',
});

export const searchAccountsState = atom<Account[]>({
  key: 'searchAccounts',
  default: [],
});
