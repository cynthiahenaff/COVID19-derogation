import React from 'react';
import 'sanitize.css';
import 'sanitize.css/typography.css';
import 'sanitize.css/forms.css';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from 'ui';

const Main = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
`;

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Main>{children}</Main>
  </ThemeProvider>
);

export default Layout;
