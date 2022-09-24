import { useParamString } from '../../../hooks/useParamString';
import { SIDE_TITLE } from '../../../libs/consts/sideTitle';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

export default function Header() {
  const { LIST_PATH } = useParamString();
  const titleList = useRef(SIDE_TITLE);

  const [pathTitle, setPathTitle] = useState('Dashboard');

  console.log(titleList);

  useEffect(() => {
    const title = titleList.current.find((title) => title.keyword === LIST_PATH);
    console.log(title);
    if (title) {
      setPathTitle(title.title);
    }
  }, [LIST_PATH]);

  return (
    <Wrapper>
      <Container>
        <div>{pathTitle}</div>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
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
`;
