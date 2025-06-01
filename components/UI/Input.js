import React from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const Label = styled.label`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: ${theme.colors.text};
  font-weight: 500;
`;

const StyledInput = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.error ? theme.colors.error : theme.colors.secondary};
  border-radius: ${theme.borderRadius.medium};
  font-family: ${theme.fonts.body};
  font-size: 1rem;
  transition: ${theme.transitions.default};
  background-color: ${props => props.disabled ? theme.colors.background : theme.colors.white};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 2px rgba(164, 144, 124, 0.2);
  }
  
  &::placeholder {
    color: ${theme.colors.lightText};
    opacity: 0.7;
  }
`;

const ErrorMessage = styled.span`
  color: ${theme.colors.error};
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

const Input = ({ 
  label, 
  id, 
  error, 
  ...props 
}) => {
  return (
    <InputWrapper>
      {label && <Label htmlFor={id}>{label}</Label>}
      <StyledInput 
        id={id}
        error={error}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default Input;
