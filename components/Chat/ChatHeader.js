import React from 'react';
import styled from 'styled-components';
import theme from '@/config/theme';
import Button from '@/components/UI/Button';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${theme.colors.primary};
  border-bottom: 1px solid ${theme.colors.secondary};
  
  .dark-mode & {
    background-color: ${theme.colors.darkMode.primary};
    border-bottom-color: ${theme.colors.darkMode.secondary};
  }
`;

const PartnerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.isConnected ? theme.colors.success : theme.colors.lightText};
`;

const PartnerName = styled.span`
  font-weight: 500;
  color: ${theme.colors.text};
  
  .dark-mode & {
    color: ${theme.colors.darkMode.text};
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ChatHeader = ({ isConnected, partnerName, onNewChat, onEndChat, onSaveConnection }) => {
  return (
    <HeaderContainer>
      <PartnerInfo>
        <StatusIndicator isConnected={isConnected} />
        <PartnerName>
          {isConnected ? partnerName : 'Not connected'}
        </PartnerName>
      </PartnerInfo>
      
      <HeaderActions>
        <Button variant="secondary" onClick={onNewChat}>
          New Chat
        </Button>
        
        {isConnected && (
          <>
            <Button variant="secondary" onClick={onSaveConnection}>
              Save Connection
            </Button>
            <Button variant="secondary" onClick={onEndChat}>
              End Chat
            </Button>
          </>
        )}
      </HeaderActions>
    </HeaderContainer>
  );
};

export default ChatHeader;
