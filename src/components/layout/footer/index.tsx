import styled from 'styled-components';
export default function Footer() {
  return (
    <FooterDescWrapper>
      <div>Copyright © December and Company Inc.</div>
    </FooterDescWrapper>
  );
}

const FooterDescWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 100px;
  width: 100%;
  height: 5vh;
`;
