import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import theme from '@/config/theme';
import { supabase } from '@/config/supabase';
import { BANNED_WORDS } from '@/config/banned-words';
import { checkContentModeration } from '@/utils/moderation';

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentPartner, setCurrentPartner] = useState(null);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [error, setError] = useState(null);
  
  // References to store subscription objects
  const chatSubscription = useRef(null);
  const waitingPoolSubscription = useRef(null);
  
  // Clean up subscriptions when component unmounts
  useEffect(() => {
    return () => {
      if (chatSubscription.current) {
        chatSubscription.current.unsubscribe();
      }
      if (waitingPoolSubscription.current) {
        waitingPoolSubscription.current.unsubscribe();
      }
    };
  }, []);
  
  // Function to start a new chat
  const startNewChat = async () => {
    try {
      setIsConnecting(true);
      setMessages([]);
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to start a chat');
      }
      
      // Add user to waiting pool
      const { data, error } = await supabase
        .from('waiting_pool')
        .insert([
          { user_id: user.id }
        ]);
      
      if (error) throw error;
      
      // Subscribe to waiting pool to get matched
      waitingPoolSubscription.current = supabase
        .channel('waiting_pool_changes')
        .on('postgres_changes', 
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'waiting_pool',
            filter: `user_id=eq.${user.id}`
          }, 
          (payload) => {
            if (payload.new.matched && payload.new.chat_id) {
              // User has been matched
              setCurrentChatId(payload.new.chat_id);
              setIsConnected(true);
              setIsConnecting(false);
              
              // Get partner info
              getPartnerInfo(payload.new.chat_id, user.id);
              
              // Subscribe to chat messages
              subscribeToChatMessages(payload.new.chat_id);
              
              // Clean up waiting pool subscription
              if (waitingPoolSubscription.current) {
                waitingPoolSubscription.current.unsubscribe();
              }
            }
          }
        )
        .subscribe();
        
    } catch (err) {
      setError(err.message);
      setIsConnecting(false);
      console.error('Error starting chat:', err);
    }
  };
  
  // Function to get partner information
  const getPartnerInfo = async (chatId, currentUserId) => {
    try {
      // Get chat participants
      const { data, error } = await supabase
        .from('chat_participants')
        .select('user_id')
        .eq('chat_id', chatId);
      
      if (error) throw error;
      
      // Find partner (not current user)
      const partnerId = data.find(p => p.user_id !== currentUserId)?.user_id;
      
      if (partnerId) {
        // For anonymity, we don't fetch actual user details
        // Just create a generic partner object
        setCurrentPartner({
          id: partnerId,
          displayName: 'Anonymous'
        });
      }
    } catch (err) {
      console.error('Error getting partner info:', err);
    }
  };
  
  // Function to subscribe to chat messages
  const subscribeToChatMessages = (chatId) => {
    // First, fetch existing messages
    fetchChatMessages(chatId);
    
    // Then subscribe to new messages
    chatSubscription.current = supabase
      .channel(`chat:${chatId}`)
      .on('postgres_changes', 
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${chatId}`
        }, 
        (payload) => {
          setMessages(prev => [...prev, payload.new]);
        }
      )
      .subscribe();
  };
  
  // Function to fetch existing chat messages
  const fetchChatMessages = async (chatId) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      setMessages(data || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };
  
  // Function to send a message
  const sendMessage = async (content) => {
    try {
      if (!currentChatId) {
        throw new Error('No active chat');
      }
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to send messages');
      }
      
      // Check for banned words
      const hasBannedWords = BANNED_WORDS.some(word => 
        content.toLowerCase().includes(word.toLowerCase())
      );
      
      // Check with OpenAI moderation if available
      const moderationResult = await checkContentModeration(content);
      const isFlagged = hasBannedWords || (moderationResult && moderationResult.flagged);
      
      // Send message
      const { data, error } = await supabase
        .from('messages')
        .insert([
          { 
            chat_id: currentChatId,
            sender_id: user.id,
            content,
            flagged: isFlagged,
            flagged_reason: isFlagged ? 'Content violates community guidelines' : null
          }
        ]);
      
      if (error) throw error;
      
    } catch (err) {
      setError(err.message);
      console.error('Error sending message:', err);
    }
  };
  
  // Function to end the current chat
  const endChat = async () => {
    try {
      if (!currentChatId) return;
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to end a chat');
      }
      
      // Update chat status
      const { error } = await supabase
        .from('chats')
        .update({ status: 'ended' })
        .eq('id', currentChatId);
      
      if (error) throw error;
      
      // Clean up
      if (chatSubscription.current) {
        chatSubscription.current.unsubscribe();
      }
      
      setIsConnected(false);
      setCurrentChatId(null);
      setCurrentPartner(null);
      setMessages([]);
      
    } catch (err) {
      setError(err.message);
      console.error('Error ending chat:', err);
    }
  };
  
  // Function to save the current connection
  const saveConnection = async () => {
    try {
      if (!currentChatId || !currentPartner) {
        throw new Error('No active chat to save');
      }
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('You must be logged in to save connections');
      }
      
      // Save connection
      const { error } = await supabase
        .from('saved_connections')
        .insert([
          { 
            user_id: user.id,
            partner_id: currentPartner.id,
            chat_id: currentChatId
          }
        ]);
      
      if (error) throw error;
      
      return { success: true };
      
    } catch (err) {
      setError(err.message);
      console.error('Error saving connection:', err);
      return { success: false, error: err.message };
    }
  };
  
  return {
    messages,
    isConnected,
    isConnecting,
    currentPartner,
    error,
    startNewChat,
    sendMessage,
    endChat,
    saveConnection
  };
};

export default useChat;
