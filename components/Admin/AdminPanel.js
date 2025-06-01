import React from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Input from '../UI/Input';

const AdminContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const AdminHeader = styled.div`
  margin-bottom: 2rem;
`;

const AdminTitle = styled.h1`
  font-size: 2rem;
  color: ${theme.colors.text};
  margin-bottom: 0.5rem;
`;

const AdminSubtitle = styled.p`
  color: ${theme.colors.lightText};
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${theme.colors.secondary};
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.active ? theme.colors.primary : 'transparent'};
  color: ${theme.colors.text};
  border: none;
  border-bottom: 3px solid ${props => props.active ? theme.colors.accent : 'transparent'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: ${theme.transitions.default};
  
  &:hover {
    background-color: ${theme.colors.background};
  }
`;

const AppealCard = styled(Card)`
  margin-bottom: 1.5rem;
  padding: 1.5rem;
`;

const AppealHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const AppealInfo = styled.div``;

const AppealId = styled.h3`
  font-size: 1.2rem;
  color: ${theme.colors.text};
  margin-bottom: 0.25rem;
`;

const AppealMeta = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const AppealMetaItem = styled.span`
  font-size: 0.9rem;
  color: ${theme.colors.lightText};
`;

const AppealStatus = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: ${theme.borderRadius.pill};
  font-size: 0.8rem;
  font-weight: 500;
  background-color: ${props => 
    props.status === 'pending' ? theme.colors.warning :
    props.status === 'approved' ? theme.colors.success :
    props.status === 'denied' ? theme.colors.error :
    theme.colors.secondary};
  color: ${props => 
    props.status === 'pending' ? '#5F4D00' :
    props.status === 'approved' ? '#2A4121' :
    props.status === 'denied' ? '#5C1F16' :
    theme.colors.text};
`;

const AppealContent = styled.div`
  margin-bottom: 1.5rem;
`;

const AppealText = styled.p`
  color: ${theme.colors.text};
  background-color: ${theme.colors.background};
  padding: 1rem;
  border-radius: ${theme.borderRadius.medium};
  border-left: 4px solid ${theme.colors.secondary};
`;

const AppealActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const ChatLogSection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px dashed ${theme.colors.secondary};
`;

const ChatLogTitle = styled.h4`
  font-size: 1rem;
  color: ${theme.colors.text};
  margin-bottom: 1rem;
`;

const ChatLogMessages = styled.div`
  background-color: ${theme.colors.background};
  padding: 1rem;
  border-radius: ${theme.borderRadius.medium};
  max-height: 300px;
  overflow-y: auto;
`;

const ChatMessage = styled.div`
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: ${theme.borderRadius.medium};
  background-color: ${props => props.flagged ? 'rgba(217, 97, 76, 0.1)' : theme.colors.white};
  border-left: 3px solid ${props => props.flagged ? theme.colors.error : theme.colors.secondary};
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  color: ${theme.colors.lightText};
`;

const MessageContent = styled.p`
  color: ${theme.colors.text};
`;

const FlaggedReason = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.error};
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: rgba(217, 97, 76, 0.1);
  border-radius: ${theme.borderRadius.small};
  display: inline-block;
`;

const AdminPanel = () => {
  // Mock data for demonstration
  const appeals = [
    {
      id: 'ap-12345',
      user_id: 'user-789',
      ip_address: '192.168.1.1',
      appeal_text: 'I believe my account was banned by mistake. I was having a normal conversation about cooking recipes when suddenly I got disconnected and banned. Please review my chat logs and reconsider this decision.',
      created_at: '2025-05-28T14:30:00Z',
      status: 'pending',
      chat_logs: [
        {
          sender: 'user-789',
          content: 'Hi there! Do you like cooking?',
          timestamp: '2025-05-28T14:15:00Z',
          flagged: false
        },
        {
          sender: 'user-456',
          content: 'Yes, I love cooking! What's your favorite dish to make?',
          timestamp: '2025-05-28T14:16:00Z',
          flagged: false
        },
        {
          sender: 'user-789',
          content: 'I really enjoy making pasta dishes. I have a great recipe for carbonara that uses eggs instead of cream.',
          timestamp: '2025-05-28T14:17:00Z',
          flagged: false
        },
        {
          sender: 'user-456',
          content: 'That sounds delicious! Would you mind sharing the recipe?',
          timestamp: '2025-05-28T14:18:00Z',
          flagged: false
        },
        {
          sender: 'user-789',
          content: 'Sure! You need pasta, eggs, pecorino cheese, pancetta, and black pepper. Cook the pasta, fry the pancetta, mix eggs with cheese, then combine everything off the heat.',
          timestamp: '2025-05-28T14:19:00Z',
          flagged: true,
          reason: 'Potential sharing of personal information'
        }
      ]
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminContainer>
      <AdminHeader>
        <AdminTitle>Admin Panel</AdminTitle>
        <AdminSubtitle>
          Review appeals and manage user accounts
        </AdminSubtitle>
      </AdminHeader>
      
      <TabsContainer>
        <Tab active>Appeals</Tab>
        <Tab>Banned Users</Tab>
        <Tab>Flagged Content</Tab>
        <Tab>Statistics</Tab>
      </TabsContainer>
      
      {appeals.map((appeal) => (
        <AppealCard key={appeal.id}>
          <AppealHeader>
            <AppealInfo>
              <AppealId>Appeal #{appeal.id}</AppealId>
              <AppealMeta>
                <AppealMetaItem>User: {appeal.user_id}</AppealMetaItem>
                <AppealMetaItem>IP: {appeal.ip_address}</AppealMetaItem>
                <AppealMetaItem>Date: {formatDate(appeal.created_at)}</AppealMetaItem>
              </AppealMeta>
            </AppealInfo>
            <AppealStatus status={appeal.status}>
              {appeal.status.charAt(0).toUpperCase() + appeal.status.slice(1)}
            </AppealStatus>
          </AppealHeader>
          
          <AppealContent>
            <AppealText>{appeal.appeal_text}</AppealText>
          </AppealContent>
          
          <ChatLogSection>
            <ChatLogTitle>Chat Logs</ChatLogTitle>
            <ChatLogMessages>
              {appeal.chat_logs.map((message, index) => (
                <ChatMessage key={index} flagged={message.flagged}>
                  <MessageHeader>
                    <span>User: {message.sender}</span>
                    <span>{formatDate(message.timestamp)}</span>
                  </MessageHeader>
                  <MessageContent>{message.content}</MessageContent>
                  {message.flagged && (
                    <FlaggedReason>Flagged: {message.reason}</FlaggedReason>
                  )}
                </ChatMessage>
              ))}
            </ChatLogMessages>
          </ChatLogSection>
          
          <AppealActions>
            <Button variant="secondary">Deny Appeal</Button>
            <Button variant="accent">Approve Appeal</Button>
          </AppealActions>
        </AppealCard>
      ))}
    </AdminContainer>
  );
};

export default AdminPanel;
