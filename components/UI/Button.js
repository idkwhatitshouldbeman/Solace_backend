import React from 'react';
import styled from 'styled-components';
import theme from '@/config/theme';

const ButtonContainer = styled.button`
  padding: ${props => props.size === 'large' ? '0.75rem 1.5rem' : '0.5rem 1rem'};
  font-size: ${props => props.size === 'large' ? '1.1rem' : '0.9rem'};
  font-weight: 500;
  border-radius: ${theme.borderRadius.medium};
  cursor: pointer;
  transition: ${theme.transitions.default};
  ${theme.flowElements.flowyButton}
  
  ${props => {
    switch(props.variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.primary};
          color: ${theme.colors.text};
          border: 1px solid ${theme.colors.secondary};
          
          &:hover {
            background-color: ${theme.colors.secondary};
          }
          
          .dark-mode & {
            background-color: ${theme.colors.darkMode.primary};
            color: ${theme.colors.darkMode.text};
            border-color: ${theme.colors.darkMode.secondary};
            
            &:hover {
              background-color: ${theme.colors.darkMode.secondary};
            }
          }
        `;
      case 'secondary':
        return `
          background-color: transparent;
          color: ${theme.colors.text};
          border: 1px solid ${theme.colors.secondary};
          
          &:hover {
            background-color: ${theme.colors.secondary};
          }
          
          .dark-mode & {
            color: ${theme.colors.darkMode.text};
            border-color: ${theme.colors.darkMode.secondary};
            
            &:hover {
              background-color: ${theme.colors.darkMode.secondary};
            }
          }
        `;
      case 'accent':
        return `
          background-color: ${theme.colors.accent};
          color: white;
          border: none;
          
          &:hover {
            background-color: #8D7B68;
          }
          
          .dark-mode & {
            background-color: ${theme.colors.darkMode.accent};
            
            &:hover {
              background-color: #A4907C;
            }
          }
        `;
      default:
        return `
          background-color: ${theme.colors.primary};
          color: ${theme.colors.text};
          border: 1px solid ${theme.colors.secondary};
          
          &:hover {
            background-color: ${theme.colors.secondary};
          }
          
          .dark-mode & {
            background-color: ${theme.colors.darkMode.primary};
            color: ${theme.colors.darkMode.text};
            border-color: ${theme.colors.darkMode.secondary};
            
            &:hover {
              background-color: ${theme.colors.darkMode.secondary};
            }
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover {
      background-color: ${props => props.variant === 'accent' ? theme.colors.accent : 
                        props.variant === 'secondary' ? 'transparent' : 
                        theme.colors.primary};
    }
  }
`;

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  type = 'button',
  disabled = false,
  onClick,
  ...props 
}) => {
  return (
    <ButtonContainer
      variant={variant}
      size={size}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;
