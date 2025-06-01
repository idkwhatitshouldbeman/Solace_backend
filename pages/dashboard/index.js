import React from 'react';
import styled from 'styled-components';
import theme from '@/config/theme';
import GlobalStyles from '@/components/GlobalStyles';
import Navbar from '@/components/UI/Navbar';
import Dashboard from '@/components/Dashboard/Dashboard';

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

export default function DashboardPage() {
  // Mock data for demonstration
  const savedConnections = [
    {
      id: 'conn-1',
      created_at: '2025-05-25T14:30:00Z'
    },
    {
      id: 'conn-2',
      created_at: '2025-05-28T09:15:00Z'
    }
  ];

  return (
    <Layout>
      <GlobalStyles />
      <Navbar isLoggedIn={true} />
      <Main>
        <Dashboard savedConnections={savedConnections} />
      </Main>
    </Layout>
  );
}
