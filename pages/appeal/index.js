import React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';
import GlobalStyles from '../components/GlobalStyles';
import Navbar from '../components/UI/Navbar';
import AppealForm from '../components/Admin/AppealForm';

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

export default function AppealPage() {
  return (
    <Layout>
      <GlobalStyles />
      <Navbar />
      <Main>
        <AppealForm />
      </Main>
    </Layout>
  );
}
