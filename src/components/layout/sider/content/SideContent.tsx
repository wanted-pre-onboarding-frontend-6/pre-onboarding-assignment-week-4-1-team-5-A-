import { useParamString } from '../../../../hooks/useParamString';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface SideMeunStyleProps {
  state?: boolean | undefined;
}

const SideContent = () => {
  const { LIST_PATH } = useParamString();
  const navigate = useNavigate();

  const [userList, setUserList] = useState(false);
  const [accountList, setAccountList] = useState(false);

  const onClickUserList = () => {
    navigate(`/user`);
    setUserList(true);
  };

  const onClickAccountList = () => {
    navigate(`/account`);
    setAccountList(true);
  };

  useEffect(() => {
    if (LIST_PATH === 'user') {
      setUserList(true);
      setAccountList(false);
    }
    if (LIST_PATH === 'account') {
      setAccountList(true);
      setUserList(false);
    }
  }, [LIST_PATH]);

  return (
    <Wrapper>
      <Menu state={userList} onClick={onClickUserList}>
        <p>사용자 목록</p>
      </Menu>
      <Menu state={accountList} onClick={onClickAccountList}>
        <p>계좌 목록</p>
      </Menu>
      <Menu>
        <p>로그아웃</p>
      </Menu>
    </Wrapper>
  );
};
export default SideContent;

const Wrapper = styled.div`
  padding: 64px 0;
  color: #999999;

  & > div:last-child {
    margin-top: 64px;

    & > p:hover {
      color: #fff;
    }
  }
`;

const Menu = styled.div<SideMeunStyleProps>`
  width: 100%;
  margin: 16px 0;
  font-size: 24px;

  & > p {
    font-weight: ${({ state }) => state && 'bold'};
    color: ${({ state }) => (state ? '#fff' : '#999999')};
    padding: 8px 64px;
    cursor: pointer;
  }

  & > ul {
    height: 0px;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
    ${({ state }) => state && 'height: 64px;'}
  }
`;
