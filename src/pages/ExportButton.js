import React from 'react';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';

const ExportButton = ({ data, fileName, fileType }) => {
  const exportToFile = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    
    if (fileType === 'csv') {
      XLSX.writeFile(workbook, `${fileName}.csv`);
    } else if (fileType === 'xlsx') {
      XLSX.writeFile(workbook, `${fileName}.xlsx`);
    }
  };

  return (
    <Button 
      variant="outlined" 
      onClick={exportToFile}
      sx={{ 
        backgroundColor: '#0cc0df', 
        color: '#FCFBFC', 
        borderColor: '#FCFBFC',
        '&:hover': {
          backgroundColor: '#14564B',
        },
        marginRight: '8px' 
      }}
    >
      Exportar a {fileType.toUpperCase()}
    </Button>
  );
};

export default ExportButton;
