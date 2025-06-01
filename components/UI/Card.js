import React from 'react';
import styled from 'styled-components';
import theme from '@/config/theme';

const CardContainer = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.large};
  ${theme.flowElements.softShadow}
  overflow: hidden;
  
  .dark-mode & {
    background-color: ${theme.colors.darkMode.primary};
  }
`;

const Card = ({ children, className, ...props }) => {
  return (
    <CardContainer className={className} {...props}>
      {children}
    </CardContainer>
  );
};

export default Card;
