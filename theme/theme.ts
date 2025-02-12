'use client';

import { createTheme } from '@mui/material/styles';
const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  components: {
    MuiTablePagination: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff3e0',
        },
        toolbar: {
          minHeight: '60px',
        },
        spacer: {
          flex: 'none',
        },
        selectLabel: {
          fontWeight: 'bold',
        },
        displayedRows: {
          color: '#ff6f00',
        },
        selectIcon: {
          color: '#ff6f00',
        },
        actions: {
          color: '#ff6f00',
        },
      },
    },
  },
});

export default theme;
