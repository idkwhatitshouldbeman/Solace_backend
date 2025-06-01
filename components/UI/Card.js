import React from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';

const CardWrapper = styled.div`
  background-color: ${props => props.transparent ? 'transparent' : theme.colors.white};
  border-radius: ${theme.borderRadius.large};
  padding: ${props => props.padding || '2rem'};
  margin-bottom: ${props => props.marginBottom || '1.5rem'};
  ${theme.flowElements.softShadow}
  transition: ${theme.transitions.default};
  
  ${props => props.hoverable && `
    &:hover {
      transform: translateY(-5px);
      box-shadow: ${theme.shadows.large};
    }
  `}
  
  ${props => props.wavy && theme.flowElements.wavyBorder}
  
  ${props => props.gradient && theme.flowElements.gradientBackground}
`;

const Card = ({ children, transparent = false, padding, marginBottom, hoverable = false, wavy = false, gradient = false, ...props }) => {
  return (
    <CardWrapper 
      transparent={transparent}
      padding={padding}
      marginBottom={marginBottom}
      hoverable={hoverable}
      wavy={wavy}
      gradient={gradient}
      {...props}
    >
      {children}
    </CardWrapper>
  );
};

export default Card;
