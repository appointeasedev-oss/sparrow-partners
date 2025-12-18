"use client";

import clsx from "clsx";
import { useSession } from "next-auth/react";
import { ComponentProps, useEffect, useState } from "react";
import { getChatConversations, subscribeToChatMessages } from "@/lib/database/chat";
import { getUsersInSameGroups } from "@/lib/database/getUsers";
import { Avatar } from "@/primitives/Avatar";
import { Spinner } from "@/primitives/Spinner";
import styles from "./ChatSidebar.module.css";

interface Props extends ComponentProps<"div"> {
  selectedUserId?: string;
  onSelectUser: (userId: string) => void;
}

export function ChatSidebar({ selectedUserId, onSelectUser, className, ...props }: Props) {
  const { data: session } = useSession();
  const [conversations, setConversations] = useState<any[]>([]);
  const [availableUsers, setAvailableUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.info?.id) return;

    const loadData = async () => {
      setLoading(true);
      
      // Load conversations and available users
      const [conversationsResult, usersResult] = await Promise.all([
        getChatConversations(session.user.info.id),
        getUsersInSameGroups(session.user.info.id),
      ]);

      if (conversationsResult.data) {
        setConversations(conversationsResult.data);
      }

      if (usersResult) {
        setAvailableUsers(usersResult);
      }

      setLoading(false);
    };

    loadData();

    // Subscribe to real-time updates
    const subscription = subscribeToChatMessages(session.user.info.id, () => {
      // Reload conversations when new messages arrive
      loadData();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [session?.user?.info?.id]);

  if (loading) {
    return (
      <div className={clsx(className, styles.sidebar)} {...props}>
        <div className={styles.header}>
          <h3>Chat</h3>
        </div>
        <div className={styles.loading}>
          <Spinner />
        </div>
      </div>
    );
  }

  // Get users who don't have conversations yet
  const conversationUserIds = new Set(conversations.map(conv => conv.partner.id));
  const newUsers = availableUsers.filter(user => !conversationUserIds.has(user.id));

  return (
    <div className={clsx(className, styles.sidebar)} {...props}>
      <div className={styles.header}>
        <h3>Chat</h3>
      </div>
      
      <div className={styles.content}>
        {conversations.length > 0 && (
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Recent</h4>
            <div className={styles.userList}>
              {conversations.map((conversation) => (
                <button
                  key={conversation.partner.id}
                  className={clsx(styles.userItem, {
                    [styles.userItemActive]: selectedUserId === conversation.partner.id,
                  })}
                  onClick={() => onSelectUser(conversation.partner.id)}
                >
                  <Avatar
                    name={conversation.partner.name}
                    src={conversation.partner.avatar}
                    color={conversation.partner.color}
                    size={32}
                  />
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{conversation.partner.name}</span>
                    <span className={styles.lastMessage}>
                      {conversation.lastMessage.message.length > 30
                        ? `${conversation.lastMessage.message.substring(0, 30)}...`
                        : conversation.lastMessage.message}
                    </span>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <div className={styles.unreadBadge}>
                      {conversation.unreadCount}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {newUsers.length > 0 && (
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Available</h4>
            <div className={styles.userList}>
              {newUsers.map((user) => (
                <button
                  key={user.id}
                  className={clsx(styles.userItem, {
                    [styles.userItemActive]: selectedUserId === user.id,
                  })}
                  onClick={() => onSelectUser(user.id)}
                >
                  <Avatar
                    name={user.name}
                    src={user.avatar}
                    color={user.color}
                    size={32}
                  />
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{user.name}</span>
                    <span className={styles.lastMessage}>Start a conversation</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {conversations.length === 0 && newUsers.length === 0 && (
          <div className={styles.emptyState}>
            <p>No users available to chat with.</p>
            <p className={styles.emptyStateSubtext}>
              You can only chat with users in your groups.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}