import React from 'react';
import theme from './components/Theme';
import { RepoTable } from './components/Table';

import { CssVarsProvider } from '@mui/joy/styles';
import { Box } from '@mui/joy';
import { useColorScheme } from '@mui/joy/styles';

export const App = () => {
  return (
    <CssVarsProvider theme={theme}>
      <RepoTable />
    </CssVarsProvider>
  );
};

export default App;
