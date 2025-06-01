import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '@/config/theme';
import Button from '@/components/UI/Button';

const InputContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid ${theme.colors.secondary};
  background-color: ${theme.colors.white};
  
  .dark-mode & {
    background-color: ${theme.colors.darkMode.primary};
    border-top-color: ${theme.colors.darkMode.secondary};
  }
`;

const InputForm = styled.form`
  display: flex;
  gap: 0.5rem;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.medium};
  font-family: ${theme.fonts.body};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 2px rgba(164, 144, 124, 0.2);
  }
  
  .dark-mode & {
    background-color: ${theme.colors.darkMode.background};
    color: ${theme.colors.darkMode.text};
    border-color: ${theme.colors.darkMode.secondary};
    
    &::placeholder {
      color: ${theme.colors.darkMode.lightText};
    }
  }
`;

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <InputContainer>
      <InputForm onSubmit={handleSubmit}>
        <MessageInput
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="accent" type="submit">
          Send
        </Button>
      </InputForm>
    </InputContainer>
  );
};

export default ChatInput;
