import React from 'react';
import styled from 'styled-components';
import theme from '@/config/theme';
import GlobalStyles from '@/components/GlobalStyles';
import Navbar from '@/components/UI/Navbar';
import AdminPanel from '@/components/Admin/AdminPanel';

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

export default function AdminPage() {
  return (
    <Layout>
      <GlobalStyles />
      <Navbar isLoggedIn={true} />
      <Main>
        <AdminPanel />
      </Main>
    </Layout>
  );
}
