import React from 'react';
import theme from './components/Theme';
import { RepositoryList } from './components/RepositoryList';

import { CssVarsProvider } from '@mui/joy/styles';

export const App = () => {
  return (
    <CssVarsProvider theme={theme} defaultMode="dark">
      <RepositoryList />
    </CssVarsProvider>
  );
};

export default App;
