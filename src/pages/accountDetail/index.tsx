import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '../../components/loading';
import useGetAccountQuery from '../../queries/account/Account';
import useGetUsersQuery from '../../queries/user/Users';
import Error from '../error';

export default function Accountdetail() {
  const { id } = useParams();

  const users = useGetUsersQuery();
  const { data, isLoading, isError } = useGetAccountQuery(id as string);

  const findUserName = (id: number): string => {
    const userName = users?.data.find((el: { id: number }) => el.id === id).name;
    return userName;
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <Container>
      <Table>
        <thead>
          <Category>사용자 이름</Category>
          <Data>{findUserName(data.user_id)}</Data>
          <Category>브로커명</Category>
          <Data>{data.broker_id}</Data>
          <Category>계좌 상태</Category>
          <Data>{data.status}</Data>
        </thead>
        <tbody>
          <tr>
            <Category>계좌번호</Category>
            <Data>{data.number}</Data>
            <Category>계좌명</Category>
            <Data>{data.name}</Data>
            <Category>평가금액</Category>
            <Data>{data.assets}</Data>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <Category>입금금액</Category>
            <Data>{data.payments}</Data>
            <Category>계좌 활성화 여부</Category>
            <Data>{data.is_active}</Data>
            <Category>계좌 개설일</Category>
            <Data>{data.created_at}</Data>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

const Container = styled.section`
  font-size: 20px;
  width: calc(100% - 330px);
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: center;
  text-align: center;
`;

const Table = styled.table`
  box-shadow: 5px 5px 5px 5px rgb(0, 0, 0, 0.02);
`;

const Category = styled.td`
  padding: 10px;
  background: #f3f3f3;
  font-weight: bold;
  border: 1px solid #e9e9e9;
`;

const Data = styled.td`
  background: #ffffff;
  padding: 50px;
  border: 1px solid E9E9E9;
`;
