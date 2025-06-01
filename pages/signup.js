import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '@/config/theme';
import GlobalStyles from '@/components/GlobalStyles';
import Navbar from '@/components/UI/Navbar';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SignupContainer = styled.div`
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  ${theme.flowElements.gradientBackground}
`;

const SignupCard = styled.div`
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

const SignupHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const SignupTitle = styled.h1`
  font-size: 2rem;
  color: ${theme.colors.text};
  margin-bottom: 0.5rem;
  
  .dark-mode & {
    color: ${theme.colors.darkMode.text};
  }
`;

const SignupSubtitle = styled.p`
  color: ${theme.colors.lightText};
  
  .dark-mode & {
    color: ${theme.colors.darkMode.lightText};
  }
`;

const SignupForm = styled.form`
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

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      const result = await signUp(email, password);
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error || 'Signup failed');
      }
    } catch (err) {
      setError('An error occurred during signup');
      console.error(err);
    }
  };

  return (
    <>
      <GlobalStyles />
      <Navbar />
      <SignupContainer>
        <SignupCard>
          <SignupHeader>
            <SignupTitle>Create Account</SignupTitle>
            <SignupSubtitle>
              Join Solace and start chatting anonymously
            </SignupSubtitle>
          </SignupHeader>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <SignupForm onSubmit={handleSubmit}>
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <Input
              label="Confirm Password"
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            
            <Button variant="accent" type="submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </SignupForm>
          
          <FormFooter>
            Already have an account? <Link href="/login">Sign in</Link>
          </FormFooter>
        </SignupCard>
      </SignupContainer>
    </>
  );
}
