import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '@/config/theme';
import { checkContentModeration } from '@/utils/moderation';
import { BANNED_WORDS } from '@/config/banned-words';

const useModeration = () => {
  const [isModerating, setIsModerating] = useState(false);
  const [moderationResult, setModerationResult] = useState(null);
  
  // Function to check content against banned words
  const checkBannedWords = (content) => {
    if (!content) return false;
    
    return BANNED_WORDS.some(word => 
      content.toLowerCase().includes(word.toLowerCase())
    );
  };
  
  // Function to moderate content using both local and API checks
  const moderateContent = async (content) => {
    try {
      setIsModerating(true);
      
      // First check against banned words list (fast, local)
      const hasBannedWords = checkBannedWords(content);
      
      if (hasBannedWords) {
        setModerationResult({
          flagged: true,
          reason: 'Content contains banned words',
          categories: { 'banned-words': true }
        });
        return { flagged: true, reason: 'Content contains banned words' };
      }
      
      // Then check with OpenAI moderation API (more comprehensive)
      const apiResult = await checkContentModeration(content);
      
      setModerationResult(apiResult);
      return apiResult;
    } catch (error) {
      console.error('Moderation error:', error);
      // Fallback to local check only if API fails
      const hasBannedWords = checkBannedWords(content);
      const result = {
        flagged: hasBannedWords,
        reason: hasBannedWords ? 'Content contains banned words' : null,
        categories: hasBannedWords ? { 'banned-words': true } : {}
      };
      
      setModerationResult(result);
      return result;
    } finally {
      setIsModerating(false);
    }
  };
  
  return {
    moderateContent,
    isModerating,
    moderationResult
  };
};

export default useModeration;
