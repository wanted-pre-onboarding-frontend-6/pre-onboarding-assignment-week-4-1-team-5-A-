import { useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import AccountApi from '../../apis/account/AccountApi';
import { Account } from '../../types/AccountType';
import BROKERS from '../../pages/account/asset/Broker.json';
import STATUS from '../../pages/account/asset/Status.json';
import { searchAccountsState } from '../../recoil/account/atoms';
import { useSetRecoilState } from 'recoil';

export default function useGetSearchQuery(searchparams: AxiosRequestConfig) {
  const setSearchAccounts = useSetRecoilState(searchAccountsState);

  return useQuery(['getSearchQuery'], () => AccountApi.getAccounts(searchparams), {
    retry: false,
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60 * 30,
    onError: (err) => {
      console.log(err, 'err');
    },
    enabled: !!searchparams?.params.q,
    onSuccess: (data) => {
      data.map((el: Account) => {
        el.broker_id = BROKER_ID[el.broker_id];
        el.status = ACCOUNT_STATUS[el.status];
        el.assets = Number(el.assets).toLocaleString();
        el.payments = Number(el.payments).toLocaleString();
        el.number = maskingFunc(el.number);
        el.is_active = el.is_active ? '활성화' : '비활성화';
      });
      setSearchAccounts(data);
    },
  });
}

const maskingFunc = (value: string) => {
  const accountNum = value;
  const strAccount = value;
  const middleMask = strAccount.substring(2, strAccount.length - 2);
  let masking = '';

  for (let i = 0; i < middleMask.length; i++) {
    masking += '*';
  }

  const maskingAccount = accountNum.replace(middleMask, masking);
  maskingAccount.slice(0, 2);
  maskingAccount.slice(maskingAccount.length - 2, maskingAccount.length);
  return maskingAccount;
};

const swapJsonToObject = (json: swapJsonToObjectProps) => {
  const stringify = JSON.stringify(json);
  const parse = JSON.parse(stringify);
  return parse;
};

const BROKER_ID = swapJsonToObject(BROKERS);
const reversedAccountStatus = swapJsonToObject(STATUS);

const ACCOUNT_STATUS = Object.fromEntries(
  Object.entries(reversedAccountStatus).map((a) => a.reverse()),
);

interface swapJsonToObjectProps {
  209?: string;
  218?: string;
  230?: string;
  238?: string;
  240?: string;
  243?: string;
  247?: string;
  261?: string;
  262?: string;
  263?: string;
  264?: string;
  265?: string;
  266?: string;
  267?: string;
  268?: string;
  269?: string;
  270?: string;
  279?: string;
  280?: string;
  288?: string;
  287?: string;
  290?: string;
  291?: string;
  292?: string;
  271?: string;
  관리자확인필요?: number;
  입금대기?: number;
  운용중?: number;
  투자중지?: number;
  해지?: number;
}
