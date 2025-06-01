import React from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MessageBubble = styled.div`
  max-width: 80%;
  padding: 0.75rem 1rem;
  border-radius: ${theme.borderRadius.large};
  margin-bottom: 0.5rem;
  position: relative;
  word-wrap: break-word;
  
  ${props => props.isSender ? `
    align-self: flex-end;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.text};
    border-bottom-right-radius: 0;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: -10px;
      width: 20px;
      height: 20px;
      background-color: ${theme.colors.primary};
      clip-path: polygon(0 0, 0% 100%, 100% 100%);
    }
  ` : `
    align-self: flex-start;
    background-color: ${theme.colors.white};
    color: ${theme.colors.text};
    border-bottom-left-radius: 0;
    box-shadow: ${theme.shadows.small};
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: -10px;
      width: 20px;
      height: 20px;
      background-color: ${theme.colors.white};
      clip-path: polygon(100% 0, 0% 100%, 100% 100%);
    }
  `}
`;

const Timestamp = styled.span`
  font-size: 0.7rem;
  color: ${theme.colors.lightText};
  margin-top: 0.2rem;
  align-self: ${props => props.isSender ? 'flex-end' : 'flex-start'};
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isSender ? 'flex-end' : 'flex-start'};
`;

const ChatMessage = ({ message, isSender }) => {
  const formattedTime = new Date(message.created_at).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  return (
    <MessageContainer isSender={isSender}>
      <MessageBubble isSender={isSender}>
        {message.content}
      </MessageBubble>
      <Timestamp isSender={isSender}>{formattedTime}</Timestamp>
    </MessageContainer>
  );
};

const ChatMessages = ({ messages, currentUserId }) => {
  return (
    <Container>
      {messages.map(message => (
        <ChatMessage 
          key={message.id} 
          message={message} 
          isSender={message.sender_id === currentUserId} 
        />
      ))}
    </Container>
  );
};

export default ChatMessages;
