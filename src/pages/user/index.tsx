import { Grid, Container } from '@mui/material';
import styled from 'styled-components';
import PageTitleWrapper from '../../components/PageTitleWrapper';
import PageHeader from './components/PageHeader';
import UsersTabel from './components/UsersTable';

export default function UserList() {
  return (
    <ContainerContent>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="xl">
        <Grid>
          <Grid>
            <UsersTabel />
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
