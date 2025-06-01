import React from 'react';
import styled from 'styled-components';
import theme from '@/config/theme';
import GlobalStyles from '@/components/GlobalStyles';
import Navbar from '@/components/UI/Navbar';
import Button from '@/components/UI/Button';
import { useRouter } from 'next/router';

const AboutContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const AboutHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const AboutTitle = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.text};
  margin-bottom: 1rem;
  
  .dark-mode & {
    color: ${theme.colors.darkMode.text};
  }
`;

const AboutSubtitle = styled.p`
  color: ${theme.colors.lightText};
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  
  .dark-mode & {
    color: ${theme.colors.darkMode.lightText};
  }
`;

const SectionContainer = styled.section`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${theme.colors.text};
  margin-bottom: 1.5rem;
  
  .dark-mode & {
    color: ${theme.colors.darkMode.text};
  }
`;

const SectionContent = styled.div`
  color: ${theme.colors.text};
  line-height: 1.7;
  
  .dark-mode & {
    color: ${theme.colors.darkMode.text};
  }
  
  p {
    margin-bottom: 1.5rem;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FeatureCard = styled.div`
  padding: 1.5rem;
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.large};
  ${theme.flowElements.softShadow}
  
  .dark-mode & {
    background-color: ${theme.colors.darkMode.primary};
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  color: ${theme.colors.text};
  margin-bottom: 1rem;
  
  .dark-mode & {
    color: ${theme.colors.darkMode.text};
  }
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.lightText};
  
  .dark-mode & {
    color: ${theme.colors.darkMode.lightText};
  }
`;

const CTASection = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: ${theme.colors.primary};
  border-radius: ${theme.borderRadius.large};
  margin-top: 2rem;
  
  .dark-mode & {
    background-color: ${theme.colors.darkMode.primary};
  }
`;

const CTATitle = styled.h2`
  font-size: 2rem;
  color: ${theme.colors.text};
  margin-bottom: 1.5rem;
  
  .dark-mode & {
    color: ${theme.colors.darkMode.text};
  }
`;

const CTAText = styled.p`
  color: ${theme.colors.lightText};
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  .dark-mode & {
    color: ${theme.colors.darkMode.lightText};
  }
`;

export default function About() {
  const router = useRouter();

  const handleStartChatting = () => {
    router.push('/chat');
  };

  return (
    <>
      <GlobalStyles />
      <Navbar />
      <AboutContainer>
        <AboutHeader>
          <AboutTitle>About Solace</AboutTitle>
          <AboutSubtitle>
            A safe space for anonymous conversations and meaningful connections
          </AboutSubtitle>
        </AboutHeader>
        
        <SectionContainer>
          <SectionTitle>Our Mission</SectionTitle>
          <SectionContent>
            <p>
              Solace was created with a simple mission: to provide a platform where people can connect and communicate freely without the pressure of social media profiles or personal identities.
            </p>
            <p>
              In today's digital world, many online interactions are tied to our real identities, making it difficult to express ourselves authentically without fear of judgment or consequences. Solace offers a refreshing alternative—a space where you can be yourself, share your thoughts, and connect with others based purely on conversation.
            </p>
          </SectionContent>
        </SectionContainer>
        
        <SectionContainer>
          <SectionTitle>Key Features</SectionTitle>
          <FeatureGrid>
            <FeatureCard>
              <FeatureTitle>Anonymous Chatting</FeatureTitle>
              <FeatureDescription>
                Connect with random users without revealing your identity. Your privacy is our top priority.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureTitle>Save Connections</FeatureTitle>
              <FeatureDescription>
                Found someone interesting? Save the connection to chat with them again in the future.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureTitle>Content Moderation</FeatureTitle>
              <FeatureDescription>
                Our advanced moderation system ensures a safe and respectful environment for all users.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureTitle>End-to-End Encryption</FeatureTitle>
              <FeatureDescription>
                Your conversations are encrypted and secure, visible only to you and your chat partner.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureTitle>Age Verification</FeatureTitle>
              <FeatureDescription>
                We ensure all users are of appropriate age to maintain a safe community.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureTitle>Simple Interface</FeatureTitle>
              <FeatureDescription>
                Our clean, intuitive design makes it easy to start chatting right away.
              </FeatureDescription>
            </FeatureCard>
          </FeatureGrid>
        </SectionContainer>
        
        <SectionContainer>
          <SectionTitle>How It Works</SectionTitle>
          <SectionContent>
            <p>
              Using Solace is simple. Sign up with just an email and password, or start chatting anonymously right away. Our matching system will connect you with another user, and you can start a conversation immediately.
            </p>
            <p>
              If you enjoy talking with someone, you can save the connection to chat with them again later. All of this happens without revealing your real identity, giving you the freedom to be yourself.
            </p>
          </SectionContent>
        </SectionContainer>
        
        <CTASection>
          <CTATitle>Ready to Start Chatting?</CTATitle>
          <CTAText>
            Join thousands of users already connecting anonymously on Solace. It's free, secure, and only takes a minute to get started.
          </CTAText>
          <Button variant="accent" size="large" onClick={handleStartChatting}>
            Start Chatting Now
          </Button>
        </CTASection>
      </AboutContainer>
    </>
  );
}
