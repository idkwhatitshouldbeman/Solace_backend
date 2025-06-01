import React from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';

const Button = styled.button`
  background-color: ${props => props.variant === 'primary' 
    ? theme.colors.primary 
    : props.variant === 'secondary' 
      ? theme.colors.secondary 
      : props.variant === 'accent' 
        ? theme.colors.accent 
        : 'transparent'};
  color: ${props => props.variant === 'accent' ? theme.colors.white : theme.colors.text};
  padding: ${props => props.size === 'small' 
    ? '0.5rem 1rem' 
    : props.size === 'large' 
      ? '1rem 2rem' 
      : '0.75rem 1.5rem'};
  border-radius: ${props => props.rounded ? theme.borderRadius.pill : theme.borderRadius.medium};
  font-weight: 500;
  transition: ${theme.transitions.default};
  ${theme.flowElements.flowyButton}
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.medium};
    background-color: ${props => props.variant === 'primary' 
      ? theme.colors.secondary 
      : props.variant === 'secondary' 
        ? theme.colors.accent 
        : props.variant === 'accent' 
          ? '#8D7B68' 
          : 'rgba(200, 182, 166, 0.2)'};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const StyledButton = ({ children, variant = 'primary', size = 'medium', rounded = false, ...props }) => {
  return (
    <Button 
      variant={variant} 
      size={size} 
      rounded={rounded} 
      {...props}
    >
      {children}
    </Button>
  );
};

export default StyledButton;
