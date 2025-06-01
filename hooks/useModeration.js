import React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';

const useModeration = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  
  const moderateMessage = async (message) => {
    try {
      const moderation = require('../utils/moderation').default;
      
      setLoading(true);
      
      // Client-side filtering
      const clientResult = moderation.clientSideFilter(message);
      
      if (!clientResult.isValid) {
        return {
          isAllowed: false,
          filteredMessage: clientResult.filteredMessage,
          reason: clientResult.reason,
          severity: 'low'
        };
      }
      
      // Check for severe violations
      const severeResult = moderation.checkSevereViolations(message);
      
      if (severeResult.hasSevereViolation) {
        return {
          isAllowed: false,
          filteredMessage: message,
          reason: `Contains severe violation: ${severeResult.violationFound}`,
          severity: 'high'
        };
      }
      
      // If message passes client-side checks, it's allowed to be sent
      // AI moderation happens asynchronously after sending
      return {
        isAllowed: true,
        filteredMessage: clientResult.filteredMessage,
        reason: '',
        severity: 'none'
      };
    } catch (error) {
      setError(error.message);
      return {
        isAllowed: false,
        filteredMessage: message,
        reason: 'Moderation error',
        severity: 'unknown'
      };
    } finally {
      setLoading(false);
    }
  };
  
  const queueForAIModeration = async (message, messageId) => {
    try {
      const moderation = require('../utils/moderation').default;
      const supabase = require('../config/supabase').default;
      
      // Queue for AI moderation
      const result = await moderation.queueForAIModeration(message);
      
      if (result.isFlagged && messageId) {
        // Update message as flagged in database
        await supabase
          .from('messages')
          .update({
            is_flagged: true,
            moderation_result: result
          })
          .eq('id', messageId);
        
        return {
          isFlagged: true,
          result
        };
      }
      
      return {
        isFlagged: false,
        result
      };
    } catch (error) {
      setError(error.message);
      return {
        isFlagged: false,
        error: error.message
      };
    }
  };
  
  return {
    loading,
    error,
    moderateMessage,
    queueForAIModeration
  };
};

export default useModeration;
