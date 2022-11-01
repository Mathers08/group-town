import React from 'react';
import { Skeleton, Stack } from '@mui/material';

const NewsSkeleton = () => {
  return (
    <Stack>
      <Skeleton variant="rounded" width={437} height={256}/>
      <Skeleton width={437} height={30}/>
      <Skeleton width={120} height={30}/>
    </Stack>
  );
};

export default NewsSkeleton;