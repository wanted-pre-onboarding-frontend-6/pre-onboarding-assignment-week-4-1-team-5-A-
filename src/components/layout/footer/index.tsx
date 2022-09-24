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
  align-items: center;
  position: absolute;
  bottom: 0;
  width: calc(100% - 380px);
  height: 100px;
  background-color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  color: #999999;

  & > span:first-child {
    color: #091e3b;
  }
  & > span:last-child {
    margin-left: 8px;
    font-size: 16px;
  }
  /* display: flex;
  justify-content: center;
  margin-left: 100px;
  width: 100%;
  height: 5vh; */
`;
