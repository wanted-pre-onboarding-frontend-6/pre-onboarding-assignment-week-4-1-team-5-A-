import { useState, useRef } from 'react';

import {
  Box,
  Menu,
  IconButton,
  Button,
  ListItemText,
  ListItem,
  List,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};
     &:hover {
        background: ${theme.colors.error.dark};
     }
    `,
);

function BulkActions({ email, onChangeEmail, password, onChangePassword, onAddUser }: any) {
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" color="text.secondary">
            email :
          </Typography>
          <input value={email} onChange={onChangeEmail}></input>
          <Typography variant="h5" color="text.secondary">
            password :
          </Typography>
          <input value={password} onChange={onChangePassword}></input>
          <ButtonError sx={{ ml: 1 }} variant="contained" onClick={onAddUser}>
            Add User
          </ButtonError>
        </Box>
        <IconButton color="primary" sx={{ ml: 2, p: 1 }}>
          <MoreVertTwoToneIcon />
        </IconButton>
      </Box>
    </>
  );
}

export default BulkActions;
