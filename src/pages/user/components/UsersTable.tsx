import { FC, ChangeEvent, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
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
  useTheme,
  CardHeader,
} from '@mui/material';
import Label from '../../../components/Label';
import { User } from '../../../models/user';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import useInput from '../../../hooks/useInput';
import useSettingUser from '../../../queries/user/useSettingUser';
import { UserList } from '../../../types/user';
import userApi from '../../../apis/user/userApi';
import accountApi from '../../../apis/account/accountApi';
import Pagenation from '../../../components/Pagenation/Pagenation';
import { usersState } from '../../../recoil/user/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

function UsersTabel() {
  const [page, onChagePage, setPage] = useInput(1);
  const [limit, onChageLimt, setLimit] = useInput(10);
  const [sort, onChangeSort, setSort] = useInput('createdAt');
  const [order, onChageOrder, setOrder] = useInput('desc');
  const [isStaff, onChageStaff, setIsStaff] = useInput(true); // undefined, true, false
  const [isAtcive, onChagneActive, setIsActive] = useInput(true); // undefined, true, false

  const [pageLimt, setPageLimt] = useState(5);
  const [totalPage, setTotalPage] = useState(0);

  const [userUUIDlist, setUserUUIDlist] = useState<any>([]);
  const [userList, setUserList] = useState<any>([]);

  const userSettingQurey = useSettingUser({
    _page: page,
    _limit: limit,
    _sort: sort,
    _order: order,
    is_staff: isStaff,
    is_active: isAtcive,
  });

  const allUserSettingQuery = useSettingUser({
    is_staff: isStaff,
    is_active: isAtcive,
  });

  // usresetting  성공적으로 불러와졌다면
  /* 
  1. userUUIDlist set // usersetting 값의 uuid 배열 ===> userList와의 foreign key
  2. userList set // userSetting 데이터로 user setting
  */
  useEffect(() => {
    if (!userSettingQurey.data?.data) return;
    const userSettingData = userSettingQurey.data.data;
    const userUUIDlist = [];

    for (const setting of userSettingData) {
      userUUIDlist.push(setting.uuid);
    }

    setUserList(userSettingQurey.data.data);
    setUserUUIDlist(userUUIDlist);
  }, [userSettingQurey.data]);

  // uuid를 바탕으로
  // user list 불러오는 역할
  // 배열을 쿼리스트링 화

  useEffect(() => {
    if (!userUUIDlist) return;
    if (!userList) return;

    // uuid 쿼리 스트링화를 위한 url 객체
    const uuidPramse = new URLSearchParams();

    //id 쿼리 스트링화를 위한 url 객체
    const idParam = new URLSearchParams();
    // userd와 setting data가 담길 배열
    const userWidthSetting: any[] = [];

    // user_id의 배열
    const userIdList: any[] = [];

    // 배열의 쿼리화를 위해 쿼리 객체에 데이터 추가
    for (const uuid of userUUIDlist) {
      uuidPramse.append('uuid', uuid);
    }

    userApi
      // 데이터의 쿼리화 후 api 전송
      .getList({ paramsSerializer: uuidPramse.toString() })
      .then((res: any) => {
        const userListData = res.data;

        // userList => userSetting의 data
        for (const userinfo of userListData) {
          // userListData => uuid를 통해 불러온 실제 db userList의 data
          // 관계역전 ==> 안시켜도됩니다
          // user => [setting: Setting]
          const user = userList.find((user: UserList) => user.uuid === userinfo.uuid);
          user.user = userinfo;
          user.account = 0;
          // user = { ... userList, setting: userSetting }
          userWidthSetting.push(user); // user와 setting 값이 같이 있는 배열
          userIdList.push(user.user.id); // account와 user의 공통점이 uuid가 아니라 id값
        }

        // 배열 쿼리화 위해 추가
        for (const id of userIdList) {
          idParam.append('user_id', id);
        }

        // 이하 동문
        accountApi
          .getList({ paramsSerializer: idParam.toString() })
          .then((res: any) => {
            const accountList = res.data;
            for (const account of accountList) {
              const user = userWidthSetting.find((user: any) => user.user.id === account.user_id);
              user.account += 1;
            }
            setUserList(userWidthSetting);
          })
          .catch((err: any) => {
            console.error(err);
          });
      })

      // 함수화 시켜서 await, promise로 처리 훨씬 더 깔끔한 코드 탄생, 유즈쿼리 화
      .catch((err: any) => {
        console.error(err);
      });
  }, [userUUIDlist]);

  // 토탈페이지 계산
  useEffect(() => {
    if (!allUserSettingQuery.data?.data) return;
    setTotalPage(Math.ceil(allUserSettingQuery.data?.data.length / limit));
  }, [allUserSettingQuery.data, limit]);

  console.log(userList);
  const setUsers = useSetRecoilState(usersState);
  setUsers(userList);
  const test = useRecoilValue(usersState);
  console.log('tests', test);

  const theme = useTheme();

  return (
    <Card>
      {/* {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>정렬</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="유저 목록"
        />
      )} */}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                {/* <Checkbox
                  color="primary"
                  checked={selectedAllUsers}
                  indeterminate={selectedSomeUsers}
                  onChange={handleSelectAllUsers}
                /> */}
              </TableCell>
              <TableCell>고객명</TableCell>
              <TableCell>보유중인 계좌수</TableCell>
              <TableCell>이메일 주소</TableCell>
              <TableCell>성별코드</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>휴대폰 번호</TableCell>
              <TableCell>최근로그인</TableCell>
              <TableCell>혜택 수신 동의 여부</TableCell>
              <TableCell>활성화 여부</TableCell>
              <TableCell>가입일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user: any) => {
              // const isUsersSelected = selectedUsers.includes(user.id);
              return (
                <TableRow
                  hover
                  key={user.id}
                  // selected={isUsersSelected}
                >
                  <TableCell padding="checkbox">
                    {/* <Checkbox
                      color="primary"
                      checked={isUsersSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneUsers(event, user.id)
                      }
                      value={isUsersSelected}
                    /> */}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {user.name}
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
                      {user.account_count}
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
                      {user.email}
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
                      {user.gender_origin}
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
                      {user.birth_date.substring(0, 10)}
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
                      {user.phone_number}
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
                      {user.last_login.substring(0, 10)}
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
                      true
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
                      false
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <Pagenation page={page} totalPage={totalPage} limit={pageLimt} setPage={setPage} />
      </Box>
    </Card>
  );
}

UsersTabel.propTypes = {
  Users: PropTypes.array.isRequired,
};

UsersTabel.defaultProps = {
  Users: [],
};

export default UsersTabel;
