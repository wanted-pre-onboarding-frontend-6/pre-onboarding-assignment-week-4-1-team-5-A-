import { ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';

import {
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  CardHeader,
} from '@mui/material';

import { useRecoilValue } from 'recoil';
import { accountsState } from '../../../recoil/account/atoms';

export default function AccountsTable() {
  const accounts = useRecoilValue(accountsState);

  return (
    <Card>
      <CardHeader
        action={
          <Box width={150}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>정렬</InputLabel>
              <Select label="Status" autoWidth>
                {filterOptions.map((filterOption) => (
                  <MenuItem key={filterOption.id} value={filterOption.id}>
                    {filterOption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        }
        title="투자 계좌"
      />

      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox color="primary" />
              </TableCell>
              <TableCell>고객명</TableCell>
              <TableCell>브로커명</TableCell>
              <TableCell>계좌번호</TableCell>
              <TableCell>계좌상태</TableCell>
              <TableCell>계좌명</TableCell>
              <TableCell>평가금액</TableCell>
              <TableCell>입금금액</TableCell>
              <TableCell>계좌활성화여부</TableCell>
              <TableCell>계좌개설일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => {
              return (
                <TableRow hover key={account.id}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.user_id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.broker_id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      broker
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.number}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      account-number
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.status}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      status
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      account-name
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.assets}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      account-assets
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.payments}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      account-payments
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.is_active}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      active
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {account.created_at}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap></Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>{/* <TablePagination /> */}</Box>
    </Card>
  );
}

const filterOptions = [
  {
    id: 'all',
    name: 'All',
  },
  {
    id: '브로커명',
    name: '브로커명',
  },
  {
    id: '계좌 활성화',
    name: '계좌 활성화',
  },
  {
    id: '계좌 상태',
    name: '계좌 상태',
  },
];
