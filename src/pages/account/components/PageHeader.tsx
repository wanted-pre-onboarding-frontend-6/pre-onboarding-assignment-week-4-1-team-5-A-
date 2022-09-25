import { Typography, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useSetRecoilState } from 'recoil';
import { accountsFilterOptionState, searchValueState } from '../../../recoil/account/Atoms';

export default function PageHeader() {
  const setSearchValue = useSetRecoilState(searchValueState);
  const setAccountsFilterOption = useSetRecoilState(accountsFilterOptionState);

  const onSearchValue = (e: { target: { value: string | ((currVal: string) => string) } }) => {
    setSearchValue(e.target.value);
    setAccountsFilterOption('검색');
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          계좌 목록
        </Typography>
        <Typography variant="subtitle2">these are all accounts</Typography>
      </Grid>
      <Grid item>
        <TextField label="검색" id="search" onChange={onSearchValue} />
      </Grid>
    </Grid>
  );
}
