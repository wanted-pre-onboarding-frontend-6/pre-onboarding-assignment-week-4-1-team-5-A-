import { accountsFilterOptionState, accountsState, searchAccountsState } from './atoms';
import { selector } from 'recoil';

export const filteredAccounts = selector({
  key: 'filteredAccounts',
  get: ({ get }) => {
    const status = get(accountsFilterOptionState);
    const accounts = get(accountsState);
    const searchAccounts = get(searchAccountsState);
    const copyArr = [...accounts];

    switch (status) {
      case 'all':
        return accounts;
      case '브로커명': {
        const brokerArr = copyArr.sort((a, b) => {
          if (a.broker_id > b.broker_id) return 1;
          if (a.broker_id < b.broker_id) return -1;
          return 0;
        });
        return brokerArr;
      }
      case '계좌 활성화': {
        const activeArr = copyArr.sort((a, b) => {
          if (a.is_active < b.is_active) return 1;
          if (a.is_active > b.is_active) return -1;
          return 0;
        });
        return activeArr;
      }
      case '계좌 상태': {
        const statusArr = copyArr.sort((a, b) => {
          if (a.status > b.status) return 1;
          if (a.status < b.status) return -1;
          return 0;
        });
        return statusArr;
      }
      case '검색':
        return searchAccounts;

      default:
        return accounts;
    }
  },
});
