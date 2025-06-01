import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '@/config/theme';
import GlobalStyles from '@/components/GlobalStyles';
import Navbar from '@/components/UI/Navbar';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 2rem;
  text-align: center;
  ${theme.flowElements.gradientBackground}
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 150px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%23FFFFFF'%3E%3C/path%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%23FFFFFF'%3E%3C/path%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%23FFFFFF'%3E%3C/path%3E%3C/svg%3E");
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: ${theme.colors.text};
  font-weight: 700;
  
  span {
    color: ${theme.colors.accent};
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  color: ${theme.colors.text};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  max-width: 1000px;
  margin: 2rem auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 1rem;
  }
`;

const AuthCard = styled.div`
  width: 100%;
  max-width: 350px;
  padding: 1.5rem;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.large};
  ${theme.flowElements.softShadow}

  .dark-mode & {
    background-color: ${theme.colors.darkMode.primary};
  }
`;

const AuthTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${theme.colors.text};
  text-align: center;

  .dark-mode & {
    color: ${theme.colors.darkMode.text};
  }
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const AuthButton = styled(Button)`
  margin-top: 1rem;
`;

const Footer = styled.footer`
  padding: 2rem;
  background-color: ${theme.colors.primary};
  text-align: center;
  color: ${theme.colors.text};

  .dark-mode & {
    background-color: ${theme.colors.darkMode.primary};
    color: ${theme.colors.darkMode.text};
  }
`;

export default function Home() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { signIn, signUp, loading } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const result = await signIn(loginEmail, loginPassword);
      if (result.success) {
        router.push('/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    
    if (signupPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      const result = await signUp(signupEmail, signupPassword);
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

  const handleStartChatting = () => {
    router.push('/chat');
  };

  const handleLearnMore = () => {
    router.push('/about');
  };

  return (
    <Layout>
      <GlobalStyles />
      <Navbar />
      <HeroSection>
        <HeroContent>
          <HeroTitle>
            Connect <span>Anonymously</span> with Solace
          </HeroTitle>
          <HeroSubtitle>
            Chat one-on-one with random strangers from around the world while staying completely anonymous.
          </HeroSubtitle>
          <AuthContainer>
            <AuthCard>
              <AuthTitle>Sign Up</AuthTitle>
              <AuthForm onSubmit={handleSignup}>
                <Input 
                  label="Email" 
                  id="signup-email" 
                  type="email" 
                  placeholder="your@email.com" 
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
                <Input 
                  label="Password" 
                  id="signup-password" 
                  type="password" 
                  placeholder="Create a password" 
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
                <Input 
                  label="Confirm Password" 
                  id="signup-confirm-password" 
                  type="password" 
                  placeholder="Confirm your password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <AuthButton variant="accent" type="submit" disabled={loading}>
                  Create Account
                </AuthButton>
              </AuthForm>
            </AuthCard>
            
            <AuthCard>
              <AuthTitle>Login</AuthTitle>
              <AuthForm onSubmit={handleLogin}>
                <Input 
                  label="Email" 
                  id="login-email" 
                  type="email" 
                  placeholder="your@email.com" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
                <Input 
                  label="Password" 
                  id="login-password" 
                  type="password" 
                  placeholder="Enter your password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <AuthButton variant="accent" type="submit" disabled={loading}>
                  Login
                </AuthButton>
              </AuthForm>
            </AuthCard>
          </AuthContainer>
          {error && <p style={{ color: theme.colors.error, marginTop: '1rem' }}>{error}</p>}
        </HeroContent>
      </HeroSection>
      <Footer>
        &copy; {new Date().getFullYear()} Solace - Anonymous 1-on-1 Chat Platform
      </Footer>
    </Layout>
  );
}
