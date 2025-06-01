import React from 'react';
import styled from 'styled-components';
import theme from '@/config/theme';
import GlobalStyles from '@/components/GlobalStyles';
import Navbar from '@/components/UI/Navbar';
import ChatInterface from '@/components/Chat/ChatInterface';

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
`;

export default function Chat() {
  // Mock data for demonstration
  const mockMessages = [
    {
      id: '1',
      sender_id: 'current-user',
      content: 'Hello there!',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      sender_id: 'other-user',
      content: 'Hi! How are you doing today?',
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      sender_id: 'current-user',
      content: 'I\'m doing great! Just trying out this new chat platform.',
      created_at: new Date().toISOString()
    }
  ];

  return (
    <Layout>
      <GlobalStyles />
      <Navbar isLoggedIn={true} />
      <Main>
        <ChatInterface 
          messages={mockMessages}
          currentUserId="current-user"
          isConnected={true}
          onSendMessage={(message) => console.log('Sending message:', message)}
          onEndChat={() => console.log('End chat')}
          onNewChat={() => console.log('New chat')}
          onSaveConnection={() => console.log('Save connection')}
        />
      </Main>
    </Layout>
  );
}
