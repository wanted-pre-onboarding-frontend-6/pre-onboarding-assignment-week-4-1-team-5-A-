import { ReactNode } from 'react';
import styled from 'styled-components';
import Sider from './sider';
import Footer from './footer';

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <LayoutWrapper>
        <Sider />
        {children}
      </LayoutWrapper>
      <Footer />
    </>
  );
}
interface LayoutProps {
  children: ReactNode;
}

const LayoutWrapper = styled.div`
  display: flex;
  margin-left: 15vw;
  width: 100%;
  height: 95vh;
`;
