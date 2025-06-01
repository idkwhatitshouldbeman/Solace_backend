import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '@/config/theme';
import Card from '@/components/UI/Card';
import Button from '@/components/UI/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${props => props.isDarkMode ? theme.colors.darkMode.primary : theme.colors.white};
  ${theme.flowElements.softShadow}
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.div`
  font-family: ${theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.isDarkMode ? theme.colors.darkMode.text : theme.colors.accent};
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const NavLink = styled.a`
  color: ${props => props.isDarkMode ? theme.colors.darkMode.text : theme.colors.text};
  font-weight: 500;
  transition: ${theme.transitions.default};
  position: relative;
  cursor: pointer;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.isDarkMode ? theme.colors.darkMode.accent : theme.colors.accent};
    transition: ${theme.transitions.default};
  }
  
  &:hover {
    color: ${props => props.isDarkMode ? theme.colors.darkMode.accent : theme.colors.accent};
    
    &:after {
      width: 100%;
    }
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.isDarkMode ? theme.colors.darkMode.text : theme.colors.text};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: ${theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  }
`;

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const router = useRouter();

  useEffect(() => {
    // Apply dark mode to body on component mount
    document.body.classList.add('dark-mode');
    
    // Check if there's a saved preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      const isDark = savedMode === 'true';
      setIsDarkMode(isDark);
      if (isDark) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    // Save preference
    localStorage.setItem('darkMode', newMode);
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    router.push('/');
  };

  return (
    <NavbarContainer isDarkMode={isDarkMode}>
      <Logo isDarkMode={isDarkMode}>Solace</Logo>
      <NavLinks>
        {isLoggedIn ? (
          <>
            <NavLink isDarkMode={isDarkMode} onClick={() => handleNavigation('/dashboard')}>Dashboard</NavLink>
            <NavLink isDarkMode={isDarkMode} onClick={() => handleNavigation('/chat')}>Chat</NavLink>
            <Button variant="secondary" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <NavLink isDarkMode={isDarkMode} onClick={() => handleNavigation('/')}>Home</NavLink>
            <NavLink isDarkMode={isDarkMode} onClick={() => handleNavigation('/about')}>About</NavLink>
            <Button variant="accent" onClick={() => handleNavigation('/login')}>Login</Button>
          </>
        )}
        <ThemeToggle onClick={toggleDarkMode} isDarkMode={isDarkMode}>
          {isDarkMode ? '☀️' : '🌙'}
        </ThemeToggle>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
