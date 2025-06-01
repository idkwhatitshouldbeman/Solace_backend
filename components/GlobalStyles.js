import { createGlobalStyle } from 'styled-components';
import theme from '../config/theme';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    font-family: ${theme.fonts.body};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    transition: ${theme.transitions.default};
    scroll-behavior: smooth;
    line-height: 1.6;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    color: ${theme.colors.text};
    margin-bottom: 1rem;
  }
  
  a {
    color: ${theme.colors.accent};
    text-decoration: none;
    transition: ${theme.transitions.default};
    
    &:hover {
      color: ${theme.colors.secondary};
    }
  }
  
  button {
    font-family: ${theme.fonts.body};
    cursor: pointer;
    border: none;
    outline: none;
    ${theme.flowElements.flowyButton}
  }
  
  input, textarea, select {
    font-family: ${theme.fonts.body};
    border: 1px solid ${theme.colors.secondary};
    border-radius: ${theme.borderRadius.medium};
    padding: 0.75rem 1rem;
    transition: ${theme.transitions.default};
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.accent};
      box-shadow: 0 0 0 2px rgba(164, 144, 124, 0.2);
    }
  }
  
  /* Dark mode styles */
  body.dark-mode {
    background-color: ${theme.colors.darkMode.background};
    color: ${theme.colors.darkMode.text};
    
    h1, h2, h3, h4, h5, h6 {
      color: ${theme.colors.darkMode.text};
    }
    
    a {
      color: ${theme.colors.darkMode.accent};
      
      &:hover {
        color: ${theme.colors.darkMode.lightText};
      }
    }
  }
  
  /* Flowy design elements */
  .wavy-border {
    ${theme.flowElements.wavyBorder}
  }
  
  .gradient-bg {
    ${theme.flowElements.gradientBackground}
  }
  
  .curved-container {
    ${theme.flowElements.curvedCorners}
    ${theme.flowElements.softShadow}
    padding: 2rem;
    background-color: ${theme.colors.white};
  }
  
  /* Animation for flowy elements */
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  
  .float-animation {
    animation: float 4s ease-in-out infinite;
  }
`;

export default GlobalStyles;
