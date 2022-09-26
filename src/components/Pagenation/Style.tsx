import styled from 'styled-components';
import { palette } from '../../styles/palette';

export interface PagenationStyleProtps {
  active: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & button {
    width: 24px;
    height: 24px;
    padding: 16px;
    margin: 0 4px;
    background-color: ${palette.subColor};
    color: ${palette.mainColor};

    :hover {
      opacity: 0.8;
    }

    :disabled {
      opacity: 0.5;
    }
  }
`;

export const Page = styled.div<PagenationStyleProtps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  padding: 16px;
  background-color: ${(props) => (props.active ? palette.mainColor : palette.subColor)};

  color: ${(props) => (props.active ? palette.subColor : palette.fontColor)};

  margin: 0 4px;
  cursor: pointer;
  :hover {
    background-color: ${palette.mainColor};
    color: ${palette.subColor};
  }
`;
