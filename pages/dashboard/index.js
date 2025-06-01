import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '@/config/theme';
import GlobalStyles from '@/components/GlobalStyles';
import Navbar from '@/components/UI/Navbar';
import Button from '@/components/UI/Button';
import Card from '@/components/UI/Card';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const DashboardHeader = styled.div`
  margin-bottom: 2rem;
`;

const DashboardTitle = styled.h1`
  font-size: 2rem;
  color: ${theme.colors.text};
  margin-bottom: 0.5rem;
  
  .dark-mode & {
    color: ${theme.colors.darkMode.text};
  }
`;

const DashboardSubtitle = styled.p`
  color: ${theme.colors.lightText};
  
  .dark-mode & {
    color: ${theme.colors.darkMode.lightText};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(Card)`
  padding: 1.5rem;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${theme.colors.accent};
  margin-bottom: 0.5rem;
  
  .dark-mode & {
    color: ${theme.colors.darkMode.accent};
  }
`;

const StatLabel = styled.div`
  color: ${theme.colors.lightText};
  font-size: 0.9rem;
  
  .dark-mode & {
    color: ${theme.colors.darkMode.lightText};
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${theme.colors.text};
  
  .dark-mode & {
    color: ${theme.colors.darkMode.text};
  }
`;

const ConnectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ConnectionCard = styled(Card)`
  padding: 1.5rem;
`;

const ConnectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ConnectionTitle = styled.h3`
  font-size: 1.2rem;
  color: ${theme.colors.text};
  
  .dark-mode & {
    color: ${theme.colors.darkMode.text};
  }
`;

const ConnectionDate = styled.span`
  font-size: 0.8rem;
  color: ${theme.colors.lightText};
  
  .dark-mode & {
    color: ${theme.colors.darkMode.lightText};
  }
`;

const ConnectionActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.large};
  
  .dark-mode & {
    background-color: ${theme.colors.darkMode.background};
  }
`;

const EmptyStateTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${theme.colors.text};
  
  .dark-mode & {
    color: ${theme.colors.darkMode.text};
  }
`;

const EmptyStateText = styled.p`
  color: ${theme.colors.lightText};
  margin-bottom: 1.5rem;
  
  .dark-mode & {
    color: ${theme.colors.darkMode.lightText};
  }
`;

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [savedConnections, setSavedConnections] = useState([]);
  const [stats, setStats] = useState({
    totalChats: 0,
    savedConnections: 0,
    messagesExchanged: 0
  });
  const router = useRouter();

  useEffect(() => {
    // Redirect if not logged in
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      // Fetch user stats and saved connections
      fetchUserStats();
      fetchSavedConnections();
    }
  }, [user, loading, router]);

  const fetchUserStats = async () => {
    // In a real app, this would fetch from the API
    // For now, using mock data
    setStats({
      totalChats: 24,
      savedConnections: 5,
      messagesExchanged: 342
    });
  };

  const fetchSavedConnections = async () => {
    // In a real app, this would fetch from the API
    // For now, using mock data
    setSavedConnections([
      {
        id: 'conn-1',
        partner_id: 'user-123',
        chat_id: 'chat-456',
        created_at: '2025-05-25T14:30:00Z'
      },
      {
        id: 'conn-2',
        partner_id: 'user-789',
        chat_id: 'chat-012',
        created_at: '2025-05-28T09:15:00Z'
      }
    ]);
  };

  const handleStartChat = () => {
    router.push('/chat');
  };

  const handleViewChat = (chatId) => {
    router.push(`/chat/${chatId}`);
  };

  const handleRemoveConnection = (connectionId) => {
    // In a real app, this would call the API
    setSavedConnections(prev => prev.filter(conn => conn.id !== connectionId));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GlobalStyles />
      <Navbar isLoggedIn={true} />
      <DashboardContainer>
        <DashboardHeader>
          <DashboardTitle>Your Dashboard</DashboardTitle>
          <DashboardSubtitle>
            View your chat statistics and saved connections
          </DashboardSubtitle>
        </DashboardHeader>

        <StatsGrid>
          <StatCard>
            <StatValue>{stats.totalChats}</StatValue>
            <StatLabel>Total Chats</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.savedConnections}</StatValue>
            <StatLabel>Saved Connections</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{stats.messagesExchanged}</StatValue>
            <StatLabel>Messages Exchanged</StatLabel>
          </StatCard>
        </StatsGrid>

        <SectionTitle>Saved Connections</SectionTitle>
        
        {savedConnections.length > 0 ? (
          <ConnectionsGrid>
            {savedConnections.map((connection) => (
              <ConnectionCard key={connection.id}>
                <ConnectionHeader>
                  <ConnectionTitle>Anonymous User</ConnectionTitle>
                  <ConnectionDate>Saved on {formatDate(connection.created_at)}</ConnectionDate>
                </ConnectionHeader>
                <ConnectionActions>
                  <Button 
                    variant="secondary" 
                    onClick={() => handleRemoveConnection(connection.id)}
                  >
                    Remove
                  </Button>
                  <Button 
                    variant="accent" 
                    onClick={() => handleViewChat(connection.chat_id)}
                  >
                    View Chat
                  </Button>
                </ConnectionActions>
              </ConnectionCard>
            ))}
          </ConnectionsGrid>
        ) : (
          <EmptyState>
            <EmptyStateTitle>No Saved Connections Yet</EmptyStateTitle>
            <EmptyStateText>
              Start chatting and save connections with people you enjoy talking to!
            </EmptyStateText>
            <Button variant="accent" onClick={handleStartChat}>
              Start Chatting
            </Button>
          </EmptyState>
        )}
      </DashboardContainer>
    </>
  );
}
