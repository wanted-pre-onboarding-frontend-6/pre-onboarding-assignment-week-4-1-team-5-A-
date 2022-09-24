import SideContent from './content/SideContent';
import SideHeader from './header/SideHeader';
import styled from 'styled-components';

const LayoutSidebar = () => {
  return (
    <Wrapper>
      <SideHeader />
      <SideContent />
    </Wrapper>
  );
};
export default LayoutSidebar;

const Wrapper = styled.div`
  width: 380px;
  background-color: #091e3b;
`;
