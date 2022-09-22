import styled from 'styled-components';
import Sider from './sider';
import Footer from './footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <LayoutWrapper>
        <Sider />
        <Outlet />
      </LayoutWrapper>
      <Footer />
    </>
  );
}

const LayoutWrapper = styled.div`
  display: flex;
  margin-left: 15vw;
  width: 100%;
  height: 95vh;
`;
