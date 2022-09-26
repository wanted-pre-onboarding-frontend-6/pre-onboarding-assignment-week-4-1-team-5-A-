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
import accountApi from '../../../apis/account/accountApi';
import Pagenation from '../../../components/Pagenation/Pagenation';
import UsersApi from '../../../apis/user/UsersApi';

function UsersTabel() {
  const [page, onChagePage, setPage] = useInput(1);
  const [limit, onChageLimt, setLimit] = useInput(10);
  const [sort, onChangeSort, setSort] = useInput('createdAt');
  const [order, onChageOrder, setOrder] = useInput('desc');
  const [isStaff, onChageStaff, setIsStaff] = useInput(undefined); // undefined, true, false
  const [isActive, onChagneActive, setIsActive] = useInput(undefined); // undefined, true, false

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
    is_active: isActive,
  });

  const allUserSettingQuery = useSettingUser({
    is_staff: isStaff,
    is_active: isActive,
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
  }, [userSettingQurey.data, isActive, isStaff]);

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

    UsersApi
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
              // user.account = user.account + 1;
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
  }, [userUUIDlist, isActive, isStaff]);

  // 토탈페이지 계산
  useEffect(() => {
    if (!allUserSettingQuery.data?.data) return;
    setTotalPage(Math.ceil(allUserSettingQuery.data?.data.length / limit));
  }, [allUserSettingQuery.data, limit, isActive, isStaff]);

  const theme = useTheme();

  const selectedBulkActions = userList.length > 0;

  const [filters, setFilters] = useState<any>({
    status: null,
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'all',
    },
    {
      id: 'active',
      name: 'active',
    },
    {
      id: 'staff',
      name: 'staff',
    },
  ];

  const handleStatusChange = (e: any): void => {
    let value: any;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    if (value === 'all') {
      setIsStaff(undefined);
      setIsActive(undefined);
    } else if (value === 'active') {
      setIsStaff(undefined);
      setIsActive(true);
    } else if (value === 'staff') {
      setIsStaff(true);
      setIsActive(undefined);
    }

    setFilters((prevFilters: any) => ({
      ...prevFilters,
      status: value,
    }));
  };

  // update delete

  const onUpdateUser = (id: number, newName: string) => {
    UsersApi.updateUser({ id, newName })
      .then((res: any) => {
        setUserList((prev: any) => prev.map((user: any) => (user.user.id === id ? res : user)));
      })
      .catch((err: any) => {
        console.error(err);
      });
  };
  const onDeleteUser = (id: number) => {
    UsersApi.deleteUser(id)
      .then((res: any) => {
        setUserList((prev: any) => prev.filter((user: any) => user.user.id !== id));
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  //add user

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onAddUser = () => {
    console.log(email, password);
    const params = { data: { email, password, id: email } };
    UsersApi.addUser(params)
      .then((res: any) => {
        setUserList((prev: any) => prev.concat(res));
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  return (
    <Card>
      <Box flex={1} p={2}>
        <BulkActions
          email={email}
          onChangeEmail={onChangeEmail}
          password={password}
          onChangePassword={onChangePassword}
          onAddUser={onAddUser}
        />
      </Box>

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
                      {user.user?.name}
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
                      {user.account}
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
                      {user.user?.email}
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
                      {user.user?.gender_origin}
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
                      {user.user?.birth_date.substring(0, 10)}
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
                      {user.user?.phone_number}
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
                      {user.user?.last_login.substring(0, 10)}
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
                      {String(user.allow_marketing_push)}
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
                      {String(user.is_active)}
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
                        onClick={() => onUpdateUser(user.user.id, 'test')}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <div>
                        <IconButton
                          sx={{
                            '&:hover': { background: theme.colors.error.lighter },
                            color: theme.palette.error.main,
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => onDeleteUser(user.user.id)}
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </div>
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
