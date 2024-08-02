import React from 'react';
import { Box } from '@mui/material';

const DotPagination = ({ count, page, onChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 2,
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Box
          key={index}
          onClick={() => onChange(null, index + 1)}
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            margin: '0 4px',
            backgroundColor: page === index + 1 ? '#1E494F' : '#E0E0E0',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            '&:hover': {
              backgroundColor: page === index + 1 ? '#1E494F' : '#BDBDBD',
            },
          }}
        />
      ))}
    </Box>
  );
};

export default DotPagination;