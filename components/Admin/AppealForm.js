import React from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Input from '../UI/Input';

const AppealContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const AppealHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const AppealTitle = styled.h1`
  font-size: 2rem;
  color: ${theme.colors.text};
  margin-bottom: 0.5rem;
`;

const AppealSubtitle = styled.p`
  color: ${theme.colors.lightText};
`;

const AppealCard = styled(Card)`
  padding: 2rem;
`;

const AppealForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  font-family: ${theme.fonts.body};
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.error ? theme.colors.error : theme.colors.secondary};
  border-radius: ${theme.borderRadius.medium};
  min-height: 150px;
  resize: vertical;
  margin-bottom: 1.5rem;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 2px rgba(164, 144, 124, 0.2);
  }
`;

const InfoText = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.lightText};
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.medium};
  border-left: 4px solid ${theme.colors.secondary};
`;

const AppealFormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const CharCount = styled.span`
  font-size: 0.8rem;
  color: ${theme.colors.lightText};
`;

const AppealForm = () => {
  return (
    <AppealContainer>
      <AppealHeader>
        <AppealTitle>Appeal Your Ban</AppealTitle>
        <AppealSubtitle>
          Explain why you believe your ban should be reconsidered
        </AppealSubtitle>
      </AppealHeader>
      
      <AppealCard>
        <InfoText>
          Your account has been banned due to a violation of our community guidelines. 
          If you believe this was a mistake, please provide a detailed explanation below. 
          Our moderation team will review your appeal within 48 hours.
        </InfoText>
        
        <AppealForm>
          <Input 
            label="Email Address" 
            id="appeal-email" 
            type="email" 
            placeholder="Enter your email address" 
            required
          />
          
          <Input 
            label="User ID (if known)" 
            id="appeal-user-id" 
            type="text" 
            placeholder="Your user ID if you know it" 
          />
          
          <label htmlFor="appeal-text">Your Appeal</label>
          <TextArea 
            id="appeal-text" 
            placeholder="Please explain why you believe your ban should be reconsidered. Be specific and provide as much detail as possible." 
            required
          />
          
          <AppealFormFooter>
            <CharCount>0/500 characters</CharCount>
            <Button variant="accent" type="submit">
              Submit Appeal
            </Button>
          </AppealFormFooter>
        </AppealForm>
      </AppealCard>
    </AppealContainer>
  );
};

export default AppealForm;
