import { supabase } from '@/config/supabase';

// Function to match users for chat
export const matchUsers = async (userId) => {
  try {
    // Check if there are any users in the waiting pool
    const { data: waitingUsers, error: fetchError } = await supabase
      .from('waiting_pool')
      .select('*')
      .neq('user_id', userId)
      .eq('matched', false)
      .limit(1);
    
    if (fetchError) throw fetchError;
    
    if (waitingUsers && waitingUsers.length > 0) {
      // Found a match, create a new chat
      const { data: chat, error: chatError } = await supabase
        .from('chats')
        .insert([
          { status: 'active' }
        ])
        .select();
      
      if (chatError) throw chatError;
      
      const chatId = chat[0].id;
      
      // Add both users to chat_participants
      const { error: participantsError } = await supabase
        .from('chat_participants')
        .insert([
          { chat_id: chatId, user_id: userId },
          { chat_id: chatId, user_id: waitingUsers[0].user_id }
        ]);
      
      if (participantsError) throw participantsError;
      
      // Update both users in waiting pool
      const { error: updateError } = await supabase
        .from('waiting_pool')
        .update({ matched: true, chat_id: chatId })
        .in('user_id', [userId, waitingUsers[0].user_id]);
      
      if (updateError) throw updateError;
      
      return { matched: true, chatId };
    } else {
      // No match found, add user to waiting pool
      const { error: insertError } = await supabase
        .from('waiting_pool')
        .insert([
          { user_id: userId, matched: false }
        ]);
      
      if (insertError) throw insertError;
      
      return { matched: false };
    }
  } catch (error) {
    console.error('Error matching users:', error);
    throw error;
  }
};

// Function to get user's active chat
export const getUserActiveChat = async (userId) => {
  try {
    // Get user's active chat
    const { data, error } = await supabase
      .from('chat_participants')
      .select(`
        chat_id,
        chats:chat_id (
          status,
          created_at
        )
      `)
      .eq('user_id', userId)
      .eq('chats.status', 'active')
      .limit(1);
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      return { 
        chatId: data[0].chat_id,
        status: data[0].chats.status,
        createdAt: data[0].chats.created_at
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting user active chat:', error);
    throw error;
  }
};

// Function to get chat partner
export const getChatPartner = async (chatId, userId) => {
  try {
    // Get chat partner
    const { data, error } = await supabase
      .from('chat_participants')
      .select(`
        user_id,
        profiles:user_id (
          username
        )
      `)
      .eq('chat_id', chatId)
      .neq('user_id', userId)
      .limit(1);
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      return {
        id: data[0].user_id,
        username: data[0].profiles?.username || 'Anonymous'
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting chat partner:', error);
    throw error;
  }
};
