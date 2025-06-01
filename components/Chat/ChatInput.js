import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';
import Button from '../UI/Button';

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: ${theme.colors.white};
  border-top: 1px solid ${theme.colors.primary};
  border-radius: 0 0 ${theme.borderRadius.large} ${theme.borderRadius.large};
`;

const InputField = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.pill};
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  transition: ${theme.transitions.default};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 2px rgba(164, 144, 124, 0.2);
  }
`;

const ButtonContainer = styled.div`
  margin-left: 0.75rem;
  display: flex;
  gap: 0.5rem;
`;

const TypingIndicator = styled.div`
  position: absolute;
  bottom: 70px;
  left: 20px;
  font-size: 0.8rem;
  color: ${theme.colors.lightText};
  font-style: italic;
`;

const ChatInput = ({ onSendMessage, onSaveConnection, isSaved, isTyping }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <>
      {isTyping && <TypingIndicator>Stranger is typing...</TypingIndicator>}
      <form onSubmit={handleSubmit}>
        <ChatInputContainer>
          <InputField
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <ButtonContainer>
            <Button type="submit" variant="accent" rounded>
              Send
            </Button>
            {!isSaved && (
              <Button 
                type="button" 
                variant="secondary" 
                rounded
                onClick={onSaveConnection}
              >
                Save Connection
              </Button>
            )}
          </ButtonContainer>
        </ChatInputContainer>
      </form>
    </>
  );
};

export default ChatInput;
