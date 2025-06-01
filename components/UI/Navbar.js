import React from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';
import Card from '../UI/Card';
import Button from '../UI/Button';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${theme.colors.white};
  ${theme.flowElements.softShadow}
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.div`
  font-family: ${theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.accent};
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const NavLink = styled.a`
  color: ${theme.colors.text};
  font-weight: 500;
  transition: ${theme.transitions.default};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${theme.colors.accent};
    transition: ${theme.transitions.default};
  }
  
  &:hover {
    color: ${theme.colors.accent};
    
    &:after {
      width: 100%;
    }
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${theme.colors.text};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: ${theme.transitions.default};
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const Navbar = ({ isLoggedIn, onLogout, toggleDarkMode, isDarkMode }) => {
  return (
    <NavbarContainer>
      <Logo>AnonyChat</Logo>
      <NavLinks>
        {isLoggedIn ? (
          <>
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/chat">Chat</NavLink>
            <Button variant="secondary" onClick={onLogout}>Logout</Button>
          </>
        ) : (
          <>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
            <Button variant="accent" as="a" href="/login">Login</Button>
          </>
        )}
        <ThemeToggle onClick={toggleDarkMode}>
          {isDarkMode ? '☀️' : '🌙'}
        </ThemeToggle>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
