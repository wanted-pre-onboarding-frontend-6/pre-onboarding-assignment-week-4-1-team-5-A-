import { Typography, Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          계좌 목록
        </Typography>
        <Typography variant="subtitle2">these are all accounts</Typography>
      </Grid>
      <Grid item>
        <TextField label="검색" id="search" />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
