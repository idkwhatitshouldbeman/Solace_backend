import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '@/config/theme';
import GlobalStyles from '@/components/GlobalStyles';
import Navbar from '@/components/UI/Navbar';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LoginContainer = styled.div`
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  ${theme.flowElements.gradientBackground}
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.large};
  ${theme.flowElements.softShadow}
  
  .dark-mode & {
    background-color: ${theme.colors.darkMode.primary};
  }
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LoginTitle = styled.h1`
  font-size: 2rem;
  color: ${theme.colors.text};
  margin-bottom: 0.5rem;
  
  .dark-mode & {
    color: ${theme.colors.darkMode.text};
  }
`;

const LoginSubtitle = styled.p`
  color: ${theme.colors.lightText};
  
  .dark-mode & {
    color: ${theme.colors.darkMode.lightText};
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormFooter = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: ${theme.colors.lightText};
  
  .dark-mode & {
    color: ${theme.colors.darkMode.lightText};
  }
  
  a {
    color: ${theme.colors.accent};
    font-weight: 500;
    
    .dark-mode & {
      color: ${theme.colors.darkMode.accent};
    }
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  background-color: rgba(217, 97, 76, 0.1);
  padding: 0.75rem;
  border-radius: ${theme.borderRadius.medium};
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const SuccessMessage = styled.div`
  color: ${theme.colors.success};
  background-color: rgba(75, 181, 67, 0.1);
  padding: 0.75rem;
  border-radius: ${theme.borderRadius.medium};
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const ResendLink = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.accent};
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  font-size: 0.9rem;
  text-decoration: underline;
  
  .dark-mode & {
    color: ${theme.colors.darkMode.accent};
  }
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [needsEmailConfirmation, setNeedsEmailConfirmation] = useState(false);
  const { signIn, loading, authError, resendConfirmationEmail, clearAuthError } = useAuth();
  const router = useRouter();

  // Check for auth error from context
  useEffect(() => {
    if (authError) {
      setError(authError);
      
      // Check if the error is about email confirmation
      if (authError.includes('Email not confirmed') || authError.includes('confirm your email')) {
        setNeedsEmailConfirmation(true);
      }
    }
    
    return () => {
      clearAuthError();
    };
  }, [authError, clearAuthError]);

  // Check for success message in query params (e.g., after email confirmation)
  useEffect(() => {
    const { success, error: queryError } = router.query;
    
    if (success) {
      setSuccessMessage(decodeURIComponent(success));
      
      // Clear the query params after displaying the message
      const { pathname } = router;
      router.replace(pathname, undefined, { shallow: true });
    }
    
    if (queryError) {
      setError(decodeURIComponent(queryError));
      
      // Check if the error is about email confirmation
      if (queryError.includes('Email not confirmed') || queryError.includes('confirm your email')) {
        setNeedsEmailConfirmation(true);
      }
      
      // Clear the query params after displaying the error
      const { pathname } = router;
      router.replace(pathname, undefined, { shallow: true });
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    try {
      const result = await signIn(email, password);
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error || 'Login failed');
        
        // Check if email confirmation is required
        if (result.requiresEmailConfirmation) {
          setNeedsEmailConfirmation(true);
        }
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    }
  };

  const handleResendConfirmation = async () => {
    if (!email) {
      setError('Please enter your email address to resend the confirmation');
      return;
    }
    
    try {
      const result = await resendConfirmationEmail(email);
      if (result.success) {
        setSuccessMessage(result.message || 'Confirmation email has been resent. Please check your inbox.');
        setError('');
      } else {
        setError(result.error || 'Failed to resend confirmation email');
      }
    } catch (err) {
      setError('An error occurred while resending the confirmation email');
      console.error(err);
    }
  };

  return (
    <>
      <GlobalStyles />
      <Navbar />
      <LoginContainer>
        <LoginCard>
          <LoginHeader>
            <LoginTitle>Welcome Back</LoginTitle>
            <LoginSubtitle>
              Sign in to your Solace account
            </LoginSubtitle>
          </LoginHeader>
          
          {error && (
            <ErrorMessage>
              {error}
              {needsEmailConfirmation && (
                <div style={{ marginTop: '0.5rem' }}>
                  Didn't receive the email? <ResendLink onClick={handleResendConfirmation}>Resend confirmation email</ResendLink>
                </div>
              )}
            </ErrorMessage>
          )}
          
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          
          <LoginForm onSubmit={handleSubmit}>
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <Button variant="accent" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </LoginForm>
          
          <FormFooter>
            Don't have an account? <Link href="/signup">Create one</Link>
          </FormFooter>
        </LoginCard>
      </LoginContainer>
    </>
  );
}
