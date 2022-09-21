import styled from 'styled-components';
export default function Footer() {
  return (
    <FooterDescWrapper>
      <FooterDesc>Copyright © December and Company Inc.</FooterDesc>
    </FooterDescWrapper>
  );
}

const FooterDescWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 120px;
  width: 100%;
  height: 5vh;
`;
const FooterDesc = styled.div``;
