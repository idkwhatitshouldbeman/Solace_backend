import React from 'react';
import styled from 'styled-components';
import theme from '@/config/theme';

const InputContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${theme.colors.text};
  
  .dark-mode & {
    color: ${theme.colors.darkMode.text};
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.error ? theme.colors.error : theme.colors.secondary};
  border-radius: ${theme.borderRadius.medium};
  font-family: ${theme.fonts.body};
  transition: ${theme.transitions.default};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 2px rgba(164, 144, 124, 0.2);
  }
  
  .dark-mode & {
    background-color: ${theme.colors.darkMode.background};
    color: ${theme.colors.darkMode.text};
    border-color: ${props => props.error ? theme.colors.error : theme.colors.darkMode.secondary};
    
    &::placeholder {
      color: ${theme.colors.darkMode.lightText};
    }
  }
`;

const ErrorText = styled.div`
  color: ${theme.colors.error};
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

const Input = ({ 
  label, 
  id, 
  error, 
  type = 'text',
  ...props 
}) => {
  return (
    <InputContainer>
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
      <InputField 
        id={id}
        type={type}
        error={error}
        {...props}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
};

export default Input;
