import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import theme from '@/config/theme';
import GlobalStyles from '@/components/GlobalStyles';
import Navbar from '@/components/UI/Navbar';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import ChatMessages from '@/components/Chat/ChatMessages';
import ChatInput from '@/components/Chat/ChatInput';
import ChatHeader from '@/components/Chat/ChatHeader';
import useChat from '@/hooks/useChat';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px);
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const ChatInterface = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.large};
  overflow: hidden;
  ${theme.flowElements.softShadow}
  
  .dark-mode & {
    background-color: ${theme.colors.darkMode.primary};
  }
`;

const ChatBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

const ConnectingMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 2rem;
  
  h3 {
    margin-bottom: 1rem;
    color: ${theme.colors.text};
    
    .dark-mode & {
      color: ${theme.colors.darkMode.text};
    }
  }
  
  p {
    color: ${theme.colors.lightText};
    margin-bottom: 2rem;
    
    .dark-mode & {
      color: ${theme.colors.darkMode.lightText};
    }
  }
`;

const LoadingDots = styled.div`
  display: flex;
  gap: 0.5rem;
  
  span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${theme.colors.accent};
    animation: bounce 1.5s infinite ease-in-out;
    
    &:nth-child(1) {
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;

export default function Chat() {
  const { user } = useAuth();
  const router = useRouter();
  const { 
    messages, 
    isConnected, 
    isConnecting, 
    currentPartner,
    sendMessage, 
    startNewChat,
    endChat,
    saveConnection
  } = useChat();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!user && !isConnecting) {
      router.push('/login');
    }
  }, [user, router, isConnecting]);

  const handleSendMessage = (content) => {
    if (content.trim() !== '') {
      sendMessage(content);
    }
  };

  const handleNewChat = () => {
    startNewChat();
  };

  const handleEndChat = () => {
    endChat();
  };

  const handleSaveConnection = () => {
    saveConnection();
  };

  return (
    <>
      <GlobalStyles />
      <Navbar isLoggedIn={!!user} />
      <ChatContainer>
        <ChatInterface>
          <ChatHeader 
            isConnected={isConnected}
            partnerName={currentPartner ? currentPartner.displayName : 'Anonymous'}
            onNewChat={handleNewChat}
            onEndChat={handleEndChat}
            onSaveConnection={handleSaveConnection}
          />
          
          <ChatBody>
            {isConnecting ? (
              <ConnectingMessage>
                <h3>Finding you a chat partner...</h3>
                <p>Please wait while we connect you with someone to chat with.</p>
                <LoadingDots>
                  <span></span>
                  <span></span>
                  <span></span>
                </LoadingDots>
              </ConnectingMessage>
            ) : isConnected ? (
              <>
                <ChatMessages messages={messages} currentUserId={user?.id} />
                <div ref={messagesEndRef} />
              </>
            ) : (
              <ConnectingMessage>
                <h3>Welcome to Solace Chat</h3>
                <p>Click the "New Chat" button to start chatting with a random person.</p>
                <Button variant="accent" onClick={handleNewChat}>
                  Start a New Chat
                </Button>
              </ConnectingMessage>
            )}
          </ChatBody>
          
          {isConnected && (
            <ChatInput onSendMessage={handleSendMessage} />
          )}
        </ChatInterface>
      </ChatContainer>
    </>
  );
}
