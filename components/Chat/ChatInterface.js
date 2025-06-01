import React from 'react';
import styled from 'styled-components';
import theme from '@/config/theme';
import ChatMessages from '@/components/Chat/ChatMessages';
import ChatInput from '@/components/Chat/ChatInput';
import ChatHeader from '@/components/Chat/ChatHeader';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: ${theme.borderRadius.large};
  overflow: hidden;
  ${theme.flowElements.softShadow}
  background-color: ${theme.colors.white};
  
  .dark-mode & {
    background-color: ${theme.colors.darkMode.primary};
  }
`;

const MessagesArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

const ChatInterface = ({ 
  messages, 
  currentUserId, 
  isConnected, 
  onSendMessage, 
  onEndChat, 
  onNewChat, 
  onSaveConnection 
}) => {
  return (
    <ChatContainer>
      <ChatHeader 
        isConnected={isConnected}
        partnerName="Anonymous"
        onNewChat={onNewChat}
        onEndChat={onEndChat}
        onSaveConnection={onSaveConnection}
      />
      
      <MessagesArea>
        <ChatMessages 
          messages={messages} 
          currentUserId={currentUserId} 
        />
      </MessagesArea>
      
      {isConnected && (
        <ChatInput onSendMessage={onSendMessage} />
      )}
    </ChatContainer>
  );
};

export default ChatInterface;
