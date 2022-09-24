import styled from 'styled-components';
import Sider from './sider';
import Header from './header';
import Footer from './footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <LayoutWrapper>
        <Sider />
        <Container>
          <Header />
          <Outlet />
          <Footer />
        </Container>
      </LayoutWrapper>
    </>
  );
}

const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
  /* display: flex;
  margin-left: 15vw;
  width: 100%;
  height: 95vh; */
`;

const Container = styled.div`
  width: calc(100% - 380px);
`;
