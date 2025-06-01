import React from 'react';
import styled from 'styled-components';
import theme from '../config/theme';

const matching = {
  /**
   * Add user to the matching queue
   * @param {string} userId - User ID to add to queue
   * @returns {Promise} - Promise resolving to queue status
   */
  addToQueue: async (userId) => {
    try {
      const supabase = require('../config/supabase').default;
      
      // Check if user is already in queue
      const { data: existingQueue } = await supabase
        .from('user_queue')
        .select('*')
        .eq('user_id', userId);
      
      if (existingQueue && existingQueue.length > 0) {
        return {
          success: true,
          status: 'already_in_queue',
          queueId: existingQueue[0].id
        };
      }
      
      // Add user to queue
      const { data, error } = await supabase
        .from('user_queue')
        .insert([{ user_id: userId }])
        .select();
      
      if (error) throw error;
      
      return {
        success: true,
        status: 'added_to_queue',
        queueId: data[0].id
      };
    } catch (error) {
      console.error('Error adding to queue:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },
  
  /**
   * Find a match for the user
   * @param {string} userId - User ID to find match for
   * @returns {Promise} - Promise resolving to match result
   */
  findMatch: async (userId) => {
    try {
      const supabase = require('../config/supabase').default;
      
      // Get oldest user in queue that isn't current user
      const { data: queuedUsers, error } = await supabase
        .from('user_queue')
        .select('*')
        .neq('user_id', userId)
        .order('created_at', { ascending: true })
        .limit(1);
      
      if (error) throw error;
      
      // No users in queue
      if (!queuedUsers || queuedUsers.length === 0) {
        return {
          success: true,
          status: 'no_match_found'
        };
      }
      
      const matchedUser = queuedUsers[0];
      
      // Create chat room
      const { data: chatRoom, error: chatRoomError } = await supabase
        .from('chat_rooms')
        .insert([{
          user1_id: userId,
          user2_id: matchedUser.user_id,
          is_saved: false,
          both_agreed_to_save: false
        }])
        .select();
      
      if (chatRoomError) throw chatRoomError;
      
      // Remove both users from queue
      await supabase
        .from('user_queue')
        .delete()
        .in('user_id', [userId, matchedUser.user_id]);
      
      return {
        success: true,
        status: 'match_found',
        chatRoomId: chatRoom[0].id,
        matchedUserId: matchedUser.user_id
      };
    } catch (error) {
      console.error('Error finding match:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },
  
  /**
   * Save connection between two users
   * @param {string} chatRoomId - Chat room ID
   * @param {string} userId - User ID requesting to save
   * @returns {Promise} - Promise resolving to save status
   */
  saveConnection: async (chatRoomId, userId) => {
    try {
      const supabase = require('../config/supabase').default;
      
      // Get chat room
      const { data: chatRoom, error } = await supabase
        .from('chat_rooms')
        .select('*')
        .eq('id', chatRoomId)
        .single();
      
      if (error) throw error;
      
      // Check if user is part of this chat room
      if (chatRoom.user1_id !== userId && chatRoom.user2_id !== userId) {
        return {
          success: false,
          error: 'User is not part of this chat room'
        };
      }
      
      // If this is the first user to agree to save
      if (!chatRoom.is_saved) {
        await supabase
          .from('chat_rooms')
          .update({ is_saved: true })
          .eq('id', chatRoomId);
        
        return {
          success: true,
          status: 'waiting_for_other_user'
        };
      }
      
      // If both users have now agreed to save
      await supabase
        .from('chat_rooms')
        .update({ both_agreed_to_save: true })
        .eq('id', chatRoomId);
      
      // Create saved connection
      await supabase
        .from('saved_connections')
        .insert([{
          user1_id: chatRoom.user1_id,
          user2_id: chatRoom.user2_id
        }]);
      
      return {
        success: true,
        status: 'connection_saved'
      };
    } catch (error) {
      console.error('Error saving connection:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
};

export default matching;
