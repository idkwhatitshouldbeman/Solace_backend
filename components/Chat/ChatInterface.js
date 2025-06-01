import React from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  max-height: 700px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: ${theme.borderRadius.large};
  ${theme.flowElements.softShadow}
  overflow: hidden;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  background-color: ${theme.colors.background};
  display: flex;
  flex-direction: column;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 2rem;
`;

const EmptyStateTitle = styled.h3`
  color: ${theme.colors.text};
  margin-bottom: 1rem;
`;

const EmptyStateText = styled.p`
  color: ${theme.colors.lightText};
  max-width: 400px;
`;

const ChatInterface = ({ 
  messages = [], 
  currentUserId, 
  isConnected = false, 
  isTyping = false,
  isSaved = false,
  onSendMessage, 
  onEndChat, 
  onNewChat,
  onSaveConnection
}) => {
  return (
    <ChatContainer>
      <ChatHeader 
        isConnected={isConnected} 
        onEndChat={onEndChat} 
        onNewChat={onNewChat} 
      />
      
      <MessagesContainer>
        {messages.length > 0 ? (
          <ChatMessages messages={messages} currentUserId={currentUserId} />
        ) : (
          <EmptyStateContainer>
            <EmptyStateTitle>
              {isConnected ? 'Start chatting!' : 'Waiting for connection...'}
            </EmptyStateTitle>
            <EmptyStateText>
              {isConnected 
                ? 'You are now connected with a random stranger. Say hello!' 
                : 'Looking for someone to chat with. Please wait a moment...'}
            </EmptyStateText>
          </EmptyStateContainer>
        )}
      </MessagesContainer>
      
      <ChatInput 
        onSendMessage={onSendMessage} 
        onSaveConnection={onSaveConnection}
        isSaved={isSaved}
        isTyping={isTyping}
      />
    </ChatContainer>
  );
};

export default ChatInterface;
