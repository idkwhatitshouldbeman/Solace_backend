import React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';

const moderation = {
  /**
   * Client-side basic filtering
   * @param {string} message - Message to filter
   * @returns {object} - Result with filtered message and status
   */
  clientSideFilter: (message) => {
    const { BANNED_WORDS } = require('../config/banned-words');
    
    // Check for empty message
    if (!message || message.trim() === '') {
      return {
        isValid: false,
        filteredMessage: '',
        reason: 'Message cannot be empty'
      };
    }
    
    // Check for banned words
    let filteredMessage = message;
    let containsBannedWord = false;
    let bannedWordFound = '';
    
    BANNED_WORDS.forEach(word => {
      if (typeof word === 'string') {
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        if (regex.test(message)) {
          containsBannedWord = true;
          bannedWordFound = word;
          filteredMessage = filteredMessage.replace(regex, '***');
        }
      } else if (word instanceof RegExp) {
        if (word.test(message)) {
          containsBannedWord = true;
          bannedWordFound = 'contact information';
          filteredMessage = filteredMessage.replace(word, '***');
        }
      }
    });
    
    return {
      isValid: !containsBannedWord,
      filteredMessage,
      reason: containsBannedWord ? `Message contains banned content: ${bannedWordFound}` : ''
    };
  },
  
  /**
   * Check for severe violations
   * @param {string} message - Message to check
   * @returns {object} - Result with violation status
   */
  checkSevereViolations: (message) => {
    const { SEVERE_VIOLATIONS } = require('../config/banned-words');
    
    let hasSevereViolation = false;
    let violationFound = '';
    
    SEVERE_VIOLATIONS.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'i');
      if (regex.test(message)) {
        hasSevereViolation = true;
        violationFound = term;
      }
    });
    
    return {
      hasSevereViolation,
      violationFound
    };
  },
  
  /**
   * Queue message for OpenAI moderation
   * @param {string} message - Message to moderate
   * @returns {Promise} - Promise resolving to moderation result
   */
  queueForAIModeration: async (message) => {
    try {
      const openai = require('../config/openai').default;
      
      const response = await openai.createModeration({
        input: message,
      });
      
      const result = response.data.results[0];
      
      return {
        isFlagged: result.flagged,
        categories: result.categories,
        categoryScores: result.category_scores,
        flaggedAboveThreshold: Object.entries(result.category_scores)
          .filter(([category, score]) => score > 0.8)
          .map(([category]) => category)
      };
    } catch (error) {
      console.error('OpenAI moderation error:', error);
      return {
        isFlagged: false,
        error: 'Moderation service unavailable'
      };
    }
  }
};

export default moderation;
