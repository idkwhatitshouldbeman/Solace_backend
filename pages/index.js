import React from 'react';
import styled from 'styled-components';
import theme from '@/config/theme';
import GlobalStyles from '@/components/GlobalStyles';
import Navbar from '@/components/UI/Navbar';
import LandingPage from '@/components/Landing/LandingPage';

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

const Footer = styled.footer`
  padding: 2rem;
  background-color: ${theme.colors.primary};
  text-align: center;
  color: ${theme.colors.text};
`;

export default function Home() {
  return (
    <Layout>
      <GlobalStyles />
      <Navbar />
      <Main>
        <LandingPage />
      </Main>
      <Footer>
        &copy; {new Date().getFullYear()} AnonyChat - Anonymous 1-on-1 Chat Platform
      </Footer>
    </Layout>
  );
}
