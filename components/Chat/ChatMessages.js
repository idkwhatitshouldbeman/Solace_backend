import React from 'react';
import styled from 'styled-components';
import theme from '@/config/theme';
import ChatInput from '@/components/Chat/ChatInput';

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 0.75rem 1rem;
  border-radius: ${theme.borderRadius.large};
  position: relative;
  word-break: break-word;
  
  ${props => props.isCurrentUser ? `
    align-self: flex-end;
    background-color: ${theme.colors.accent};
    color: white;
    border-bottom-right-radius: 0;
    
    .dark-mode & {
      background-color: ${theme.colors.darkMode.accent};
    }
  ` : `
    align-self: flex-start;
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.text};
    border-bottom-left-radius: 0;
    
    .dark-mode & {
      background-color: ${theme.colors.darkMode.secondary};
      color: ${theme.colors.darkMode.text};
    }
  `}
`;

const MessageTime = styled.span`
  font-size: 0.7rem;
  color: ${props => props.isCurrentUser ? 'rgba(255, 255, 255, 0.7)' : theme.colors.lightText};
  position: absolute;
  bottom: -1.2rem;
  ${props => props.isCurrentUser ? 'right: 0.5rem;' : 'left: 0.5rem;'}
  
  .dark-mode & {
    color: ${props => props.isCurrentUser ? 'rgba(255, 255, 255, 0.7)' : theme.colors.darkMode.lightText};
  }
`;

const EmptyMessages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  text-align: center;
  
  h3 {
    margin-bottom: 1rem;
    color: ${theme.colors.text};
    
    .dark-mode & {
      color: ${theme.colors.darkMode.text};
    }
  }
  
  p {
    color: ${theme.colors.lightText};
    
    .dark-mode & {
      color: ${theme.colors.darkMode.lightText};
    }
  }
`;

const ChatMessages = ({ messages, currentUserId }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!messages || messages.length === 0) {
    return (
      <EmptyMessages>
        <h3>No messages yet</h3>
        <p>Start the conversation by sending a message!</p>
      </EmptyMessages>
    );
  }

  return (
    <MessagesContainer>
      {messages.map((message, index) => {
        const isCurrentUser = message.sender_id === currentUserId;
        
        return (
          <MessageBubble key={index} isCurrentUser={isCurrentUser}>
            {message.content}
            <MessageTime isCurrentUser={isCurrentUser}>
              {formatTime(message.created_at)}
            </MessageTime>
          </MessageBubble>
        );
      })}
    </MessagesContainer>
  );
};

export default ChatMessages;
