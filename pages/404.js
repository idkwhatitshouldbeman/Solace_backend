import React from 'react';
import styled from 'styled-components';
import theme from '@/config/theme';
import GlobalStyles from '@/components/GlobalStyles';
import Navbar from '@/components/UI/Navbar';
import Button from '@/components/UI/Button';
import { useRouter } from 'next/router';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 70px);
  padding: 2rem;
  text-align: center;
`;

const NotFoundTitle = styled.h1`
  font-size: 6rem;
  color: ${theme.colors.accent};
  margin-bottom: 1rem;
  
  .dark-mode & {
    color: ${theme.colors.darkMode.accent};
  }
`;

const NotFoundSubtitle = styled.h2`
  font-size: 2rem;
  color: ${theme.colors.text};
  margin-bottom: 2rem;
  
  .dark-mode & {
    color: ${theme.colors.darkMode.text};
  }
`;

const NotFoundText = styled.p`
  color: ${theme.colors.lightText};
  margin-bottom: 2rem;
  max-width: 500px;
  
  .dark-mode & {
    color: ${theme.colors.darkMode.lightText};
  }
`;

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <>
      <GlobalStyles />
      <Navbar />
      <NotFoundContainer>
        <NotFoundTitle>404</NotFoundTitle>
        <NotFoundSubtitle>Page Not Found</NotFoundSubtitle>
        <NotFoundText>
          The page you are looking for doesn't exist or has been moved.
        </NotFoundText>
        <Button variant="accent" onClick={handleGoHome}>
          Go Back Home
        </Button>
      </NotFoundContainer>
    </>
  );
}
