import React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';

const validation = {
  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} - Whether email is valid
   */
  isValidEmail: (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  },
  
  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {object} - Validation result with strength and feedback
   */
  validatePassword: (password) => {
    if (!password) {
      return {
        isValid: false,
        strength: 'none',
        feedback: 'Password is required'
      };
    }
    
    if (password.length < 8) {
      return {
        isValid: false,
        strength: 'weak',
        feedback: 'Password must be at least 8 characters long'
      };
    }
    
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const strength = 
      (hasUppercase && hasLowercase && hasNumbers && hasSpecialChars) ? 'strong' :
      (hasUppercase && hasLowercase && (hasNumbers || hasSpecialChars)) ? 'medium' :
      'weak';
    
    let feedback = '';
    
    if (strength === 'weak') {
      feedback = 'Password is weak. Consider adding uppercase letters, numbers, and special characters.';
    } else if (strength === 'medium') {
      feedback = 'Password is medium strength. Consider adding more variety for stronger security.';
    }
    
    return {
      isValid: strength !== 'weak',
      strength,
      feedback
    };
  },
  
  /**
   * Validate age (13+ requirement)
   * @param {boolean} isOver13 - User confirmation of being 13+
   * @returns {boolean} - Whether age requirement is met
   */
  validateAge: (isOver13) => {
    return isOver13 === true;
  },
  
  /**
   * Sanitize user input to prevent XSS
   * @param {string} input - User input to sanitize
   * @returns {string} - Sanitized input
   */
  sanitizeInput: (input) => {
    if (!input) return '';
    
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
};

export default validation;
