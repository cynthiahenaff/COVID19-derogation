import React from 'react';
import 'sanitize.css';
import 'sanitize.css/typography.css';
import 'sanitize.css/forms.css';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from 'ui';
import Footer from 'components/Footer';

const Page = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
`;

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Page>
      <main>{children}</main>
      <Footer></Footer>
    </Page>
  </ThemeProvider>
);

export default Layout;
