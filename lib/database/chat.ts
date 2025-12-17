import { supabase } from "./supabase";

export type ChatMessage = {
  id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  read: boolean;
  created_at: string;
  sender?: {
    id: string;
    name: string;
    avatar: string | null;
    color: string;
  };
  receiver?: {
    id: string;
    name: string;
    avatar: string | null;
    color: string;
  };
};

/**
 * Send a chat message
 */
export async function sendMessage(senderId: string, receiverId: string, message: string) {
  const { data, error } = await supabase
    .from('chat_messages')
    .insert({
      sender_id: senderId,
      receiver_id: receiverId,
      message: message.trim(),
    })
    .select(`
      *,
      sender:users!sender_id(id, name, avatar, color),
      receiver:users!receiver_id(id, name, avatar, color)
    `)
    .single();

  if (error) {
    console.error('Error sending message:', error);
    return { data: null, error };
  }

  return { data, error: null };
}

/**
 * Get chat messages between two users
 */
export async function getChatMessages(userId1: string, userId2: string, limit = 50) {
  const { data, error } = await supabase
    .from('chat_messages')
    .select(`
      *,
      sender:users!sender_id(id, name, avatar, color),
      receiver:users!receiver_id(id, name, avatar, color)
    `)
    .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
    .order('created_at', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('Error fetching chat messages:', error);
    return { data: [], error };
  }

  return { data: data || [], error: null };
}

/**
 * Mark messages as read
 */
export async function markMessagesAsRead(senderId: string, receiverId: string) {
  const { error } = await supabase
    .from('chat_messages')
    .update({ read: true })
    .eq('sender_id', senderId)
    .eq('receiver_id', receiverId)
    .eq('read', false);

  if (error) {
    console.error('Error marking messages as read:', error);
    return { error };
  }

  return { error: null };
}

/**
 * Get chat conversations for a user
 */
export async function getChatConversations(userId: string) {
  const { data, error } = await supabase
    .from('chat_messages')
    .select(`
      *,
      sender:users!sender_id(id, name, avatar, color),
      receiver:users!receiver_id(id, name, avatar, color)
    `)
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching conversations:', error);
    return { data: [], error };
  }

  // Group messages by conversation partner
  const conversations = new Map();
  
  data?.forEach((message) => {
    const partnerId = message.sender_id === userId ? message.receiver_id : message.sender_id;
    const partner = message.sender_id === userId ? message.receiver : message.sender;
    
    if (!conversations.has(partnerId)) {
      conversations.set(partnerId, {
        partner,
        lastMessage: message,
        unreadCount: 0,
      });
    }
    
    // Count unread messages from partner
    if (message.sender_id === partnerId && !message.read) {
      const conv = conversations.get(partnerId);
      conv.unreadCount++;
    }
  });

  return { data: Array.from(conversations.values()), error: null };
}

/**
 * Subscribe to real-time chat messages
 */
export function subscribeToChatMessages(userId: string, callback: (message: ChatMessage) => void) {
  return supabase
    .channel('chat_messages')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `or(sender_id.eq.${userId},receiver_id.eq.${userId})`,
      },
      async (payload) => {
        // Fetch the complete message with user data
        const { data } = await supabase
          .from('chat_messages')
          .select(`
            *,
            sender:users!sender_id(id, name, avatar, color),
            receiver:users!receiver_id(id, name, avatar, color)
          `)
          .eq('id', payload.new.id)
          .single();

        if (data) {
          callback(data as ChatMessage);
        }
      }
    )
    .subscribe();
}