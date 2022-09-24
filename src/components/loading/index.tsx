import { Box } from '@mui/material';
import ReactLoading from 'react-loading';

export default function Loading(props: { height?: number; width?: number }) {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <ReactLoading
        type={'spokes'}
        color={'#11418a'}
        height={props ? props.height : 150}
        width={props ? props.width : 80}
      />
    </Box>
  );
}
