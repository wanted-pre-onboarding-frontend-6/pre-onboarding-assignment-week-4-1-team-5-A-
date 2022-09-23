import PageHeader from './components/PageHeader';
import PageTitleWrapper from '../../components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Accounts from './components/Accounts';
import styled from 'styled-components';

export default function AccountList() {
  return (
    <ContainerContent>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="xl">
        <Grid>
          <Grid>
            <Accounts />
          </Grid>
        </Grid>
      </Container>
    </ContainerContent>
  );
}

const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 85vw;
`;
