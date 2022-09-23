import { useState } from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function Sider() {
  const [childDropDownOpen, setchildDropDownOpen] = useState<string[]>([]);

  const onChildDropDown = (id: string): void => {
    if (childDropDownOpen.some((el) => el === id))
      return setchildDropDownOpen((prev) => prev.filter((el) => el !== id));

    setchildDropDownOpen((prev) => [...prev, id]);
  };

  return (
    <Drawer variant="permanent">
      <List disablePadding sx={{ height: '100%', bgcolor: '#101F33', width: '15vw' }}>
        <ListItem
          sx={{
            ...MAIN_SX_PROPS,
            ...SUB_SX_PROPS,
            fontSize: 22,
            color: '#fff',
            bgcolor: '#101F33',
            textAlign: 'center',
          }}
        >
          PREFACE
        </ListItem>
        <ListItem sx={{ ...MAIN_SX_PROPS, ...SUB_SX_PROPS, bgcolor: '#101F33' }}>
          <ListItemIcon>
            <HomeIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText>대시 보드</ListItemText>
        </ListItem>
        {SIDE_MENU.map(({ id, icon, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem
              sx={{
                ...MAIN_SX_PROPS,
                px: 3,
                textAlign: 'center',
                cursor: 'pointer',
                pt: '10px',
                pb: '10px',
              }}
              onClick={() => onChildDropDown(id)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {childDropDownOpen.some((el) => el === id) &&
              children?.map(({ id: childId }) => (
                <ListItem disablePadding key={childId}>
                  <ListItemButton sx={{ ...MAIN_SX_PROPS, pl: '50px' }}>
                    <ListItemText sx={{ textAlign: 'right', pr: '30px' }}>{childId}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            <Divider />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}

const SIDE_MENU = [
  {
    id: '계좌 관리',
    icon: <AccountBalanceOutlinedIcon sx={{ color: 'white' }} />,
    children: [
      {
        id: '계좌 목록',
        active: true,
      },
    ],
  },
  {
    id: '사용자 관리',
    icon: <AccessibilityNewOutlinedIcon sx={{ color: 'white' }} />,
    children: [
      {
        id: '사용자 목록',
        active: true,
      },
    ],
  },
  {
    id: '로그아웃',
    icon: <LogoutOutlinedIcon sx={{ color: 'white' }} />,
  },
];

const MAIN_SX_PROPS = {
  py: '2px',
  px: 3,
  cursor: 'pointer',
  color: 'white',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const SUB_SX_PROPS = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};
