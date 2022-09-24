import styled from 'styled-components';
import logo from '../../../../assets/images/december.jpeg';

const SideHeader = () => {
  return (
    <Wrapper>
      <Container>
        <img src={logo} />
        <span>December</span>
      </Container>
      <div>X</div>
    </Wrapper>
  );
};
export default SideHeader;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 80px;
  background-color: #091e3b;
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  padding: 0 32px;
  & > div {
    cursor: pointer;
  }
`;

const Container = styled.div`
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  & > img {
    width: 40px;
    height: 40px;
    margin-right: 16px;
  }
`;
