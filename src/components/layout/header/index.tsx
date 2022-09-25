import { useParamString } from '../../../hooks/useParamString';
import { SIDE_TITLE } from '../../../libs/consts/sideTitle';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import userStorage from '../../../utils/userStorage';

export default function Header() {
  const { LIST_PATH } = useParamString();
  const titleList = useRef(SIDE_TITLE);
  const user = userStorage.getUser();

  const [pathTitle, setPathTitle] = useState('');

  useEffect(() => {
    const title = titleList.current.find((title) => title.keyword === LIST_PATH);
    if (title) {
      setPathTitle(title.title);
    }
  }, [LIST_PATH]);

  return (
    <Wrapper>
      <Container>
        <div>{pathTitle}</div>
        <div>{user.email}</div>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15%;
  width: 85%;
  height: 8%;
  background-color: #ffffff;
  box-shadow: 1px 0px 16px 5px rgba(0, 0, 0, 0.1);
`;

export const Container = styled.div`
  width: 100%;
  padding: 64px;
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  font-weight: 500;
  div {
    font-weight: 700;
    font-size: 25px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
      sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
  }
`;
