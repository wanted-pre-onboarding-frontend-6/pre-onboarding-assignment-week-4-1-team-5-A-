import { Typography, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';

function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          유저 목록
        </Typography>
        <Typography variant="subtitle2">these are all users</Typography>
      </Grid>
      <Grid item>
        <TextField label="검색" id="search" />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
