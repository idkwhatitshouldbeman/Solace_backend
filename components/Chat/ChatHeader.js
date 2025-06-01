import React from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';

const ChatHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.large} ${theme.borderRadius.large} 0 0;
  border-bottom: 1px solid ${theme.colors.secondary};
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.online ? theme.colors.success : theme.colors.lightText};
`;

const StatusText = styled.span`
  font-size: 0.9rem;
  color: ${theme.colors.text};
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${theme.colors.text};
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${theme.borderRadius.small};
  transition: ${theme.transitions.default};
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const ChatHeader = ({ isConnected, onEndChat, onNewChat }) => {
  return (
    <ChatHeaderContainer>
      <StatusContainer>
        <StatusDot online={isConnected} />
        <StatusText>
          {isConnected ? 'Connected with Stranger' : 'Disconnected'}
        </StatusText>
      </StatusContainer>
      <ActionButtons>
        <ActionButton onClick={onNewChat}>
          New Chat
        </ActionButton>
        <ActionButton onClick={onEndChat}>
          End Chat
        </ActionButton>
      </ActionButtons>
    </ChatHeaderContainer>
  );
};

export default ChatHeader;
