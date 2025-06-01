import { BANNED_WORDS } from '@/config/banned-words';

// Function to validate email format
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function to validate password strength
export const validatePassword = (password) => {
  // Password must be at least 8 characters
  if (password.length < 8) {
    return {
      valid: false,
      message: 'Password must be at least 8 characters long'
    };
  }
  
  // Password should contain at least one number
  if (!/\d/.test(password)) {
    return {
      valid: false,
      message: 'Password must contain at least one number'
    };
  }
  
  // Password should contain at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      valid: false,
      message: 'Password must contain at least one special character'
    };
  }
  
  return {
    valid: true,
    message: 'Password is strong'
  };
};

// Function to validate chat message content
export const validateChatMessage = (content) => {
  // Message cannot be empty
  if (!content || content.trim() === '') {
    return {
      valid: false,
      message: 'Message cannot be empty'
    };
  }
  
  // Message cannot be too long
  if (content.length > 1000) {
    return {
      valid: false,
      message: 'Message is too long (maximum 1000 characters)'
    };
  }
  
  // Check for banned words
  const hasBannedWords = BANNED_WORDS.some(word => 
    content.toLowerCase().includes(word.toLowerCase())
  );
  
  if (hasBannedWords) {
    return {
      valid: false,
      message: 'Message contains inappropriate content',
      flagged: true
    };
  }
  
  return {
    valid: true,
    message: 'Message is valid'
  };
};

// Function to validate age (must be 18+)
export const validateAge = (birthdate) => {
  const today = new Date();
  const birth = new Date(birthdate);
  
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return {
    valid: age >= 18,
    message: age >= 18 ? 'Age verified' : 'You must be 18 or older to use this service'
  };
};
