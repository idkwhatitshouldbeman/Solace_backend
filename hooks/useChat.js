import React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';

const useChat = (chatRoomId, userId) => {
  const [messages, setMessages] = React.useState([]);
  const [isConnected, setIsConnected] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [error, setError] = React.useState(null);
  
  React.useEffect(() => {
    if (!chatRoomId) return;
    
    // Set up Supabase realtime subscription for messages
    const setupRealtimeSubscription = async () => {
      const supabase = require('../config/supabase').default;
      
      // Get chat room details
      const { data: chatRoom, error: roomError } = await supabase
        .from('chat_rooms')
        .select('*')
        .eq('id', chatRoomId)
        .single();
      
      if (roomError) {
        setError(roomError.message);
        return;
      }
      
      setIsConnected(true);
      setIsSaved(chatRoom.both_agreed_to_save);
      
      // Get existing messages
      const { data: existingMessages, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_room_id', chatRoomId)
        .order('created_at', { ascending: true });
      
      if (!messagesError && existingMessages) {
        setMessages(existingMessages);
      }
      
      // Subscribe to new messages
      const subscription = supabase
        .channel(`chat_${chatRoomId}`)
        .on('postgres_changes', { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `chat_room_id=eq.${chatRoomId}`
        }, (payload) => {
          setMessages(prev => [...prev, payload.new]);
        })
        .on('postgres_changes', {
          event: 'UPDATE',
          schema: 'public',
          table: 'chat_rooms',
          filter: `id=eq.${chatRoomId}`
        }, (payload) => {
          if (payload.new.both_agreed_to_save) {
            setIsSaved(true);
          }
        })
        .subscribe();
      
      return () => {
        subscription.unsubscribe();
      };
    };
    
    setupRealtimeSubscription();
  }, [chatRoomId, userId]);
  
  const sendMessage = async (content) => {
    if (!chatRoomId || !userId || !content.trim()) return;
    
    try {
      const supabase = require('../config/supabase').default;
      const moderation = require('./moderation').default;
      
      // Client-side filtering
      const { isValid, filteredMessage, reason } = moderation.clientSideFilter(content);
      
      if (!isValid) {
        setError(reason);
        return false;
      }
      
      // Check for severe violations
      const { hasSevereViolation, violationFound } = moderation.checkSevereViolations(content);
      
      if (hasSevereViolation) {
        setError(`Message contains severe violation: ${violationFound}`);
        // TODO: Trigger ban process
        return false;
      }
      
      // Send message
      const { data, error } = await supabase
        .from('messages')
        .insert([{
          chat_room_id: chatRoomId,
          sender_id: userId,
          content: filteredMessage
        }])
        .select();
      
      if (error) throw error;
      
      // Queue for AI moderation (background process)
      moderation.queueForAIModeration(content).then(result => {
        if (result.isFlagged) {
          // Update message as flagged
          supabase
            .from('messages')
            .update({ 
              is_flagged: true,
              moderation_result: result
            })
            .eq('id', data[0].id);
        }
      });
      
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };
  
  const endChat = async () => {
    if (!chatRoomId) return;
    
    try {
      const supabase = require('../config/supabase').default;
      
      // If chat is not saved, delete it
      if (!isSaved) {
        // Delete messages first (foreign key constraint)
        await supabase
          .from('messages')
          .delete()
          .eq('chat_room_id', chatRoomId);
        
        // Delete chat room
        await supabase
          .from('chat_rooms')
          .delete()
          .eq('id', chatRoomId);
      }
      
      setIsConnected(false);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  };
  
  const saveConnection = async () => {
    if (!chatRoomId || !userId) return;
    
    try {
      const matching = require('./matching').default;
      const result = await matching.saveConnection(chatRoomId, userId);
      
      if (result.success && result.status === 'connection_saved') {
        setIsSaved(true);
      }
      
      return result;
    } catch (error) {
      setError(error.message);
      return {
        success: false,
        error: error.message
      };
    }
  };
  
  return {
    messages,
    isConnected,
    isTyping,
    isSaved,
    error,
    sendMessage,
    endChat,
    saveConnection
  };
};

export default useChat;
