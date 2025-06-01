import React from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';
import Card from '../UI/Card';
import Button from '../UI/Button';

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const DashboardHeader = styled.div`
  margin-bottom: 2rem;
`;

const DashboardTitle = styled.h1`
  font-size: 2rem;
  color: ${theme.colors.text};
  margin-bottom: 0.5rem;
`;

const DashboardSubtitle = styled.p`
  color: ${theme.colors.lightText};
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ConnectionCard = styled(Card)`
  display: flex;
  flex-direction: column;
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
`;

const ConnectionDate = styled.span`
  font-size: 0.8rem;
  color: ${theme.colors.lightText};
`;

const ConnectionActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const NewChatSection = styled.div`
  text-align: center;
  padding: 3rem 0;
`;

const NewChatTitle = styled.h2`
  font-size: 1.8rem;
  color: ${theme.colors.text};
  margin-bottom: 1.5rem;
`;

const NewChatButton = styled(Button)`
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.large};
  margin-bottom: 3rem;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.5rem;
  color: ${theme.colors.text};
  margin-bottom: 1rem;
`;

const EmptyStateText = styled.p`
  color: ${theme.colors.lightText};
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const Dashboard = ({ savedConnections = [] }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <DashboardTitle>Your Dashboard</DashboardTitle>
        <DashboardSubtitle>
          Manage your saved connections and start new chats
        </DashboardSubtitle>
      </DashboardHeader>
      
      {savedConnections.length > 0 ? (
        <>
          <DashboardTitle as="h2">Saved Connections</DashboardTitle>
          <DashboardGrid>
            {savedConnections.map((connection) => (
              <ConnectionCard key={connection.id} hoverable>
                <ConnectionHeader>
                  <ConnectionTitle>Anonymous User</ConnectionTitle>
                  <ConnectionDate>
                    Saved on {formatDate(connection.created_at)}
                  </ConnectionDate>
                </ConnectionHeader>
                <ConnectionActions>
                  <Button variant="accent">Chat Now</Button>
                  <Button variant="secondary">Remove</Button>
                </ConnectionActions>
              </ConnectionCard>
            ))}
          </DashboardGrid>
        </>
      ) : (
        <EmptyState>
          <EmptyStateTitle>No Saved Connections Yet</EmptyStateTitle>
          <EmptyStateText>
            When you find someone interesting, both of you can agree to save the connection.
            Saved connections will appear here for future chats.
          </EmptyStateText>
          <Button variant="secondary">Learn How It Works</Button>
        </EmptyState>
      )}
      
      <NewChatSection>
        <NewChatTitle>Ready to meet someone new?</NewChatTitle>
        <NewChatButton variant="accent" size="large">
          Start Random Chat
        </NewChatButton>
      </NewChatSection>
    </DashboardContainer>
  );
};

export default Dashboard;
