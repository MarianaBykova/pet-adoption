import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const SkeletonMui = () => {
  return (
    <div className='skeleton'>
    <Skeleton variant="rectangular" width={300} height={250} />
    <Box sx={{ pt: 0.5 }}>
      <Skeleton height={100}/>
      <Skeleton width="40%" />
    </Box>
    </div>
  );
}
 
export default SkeletonMui;
