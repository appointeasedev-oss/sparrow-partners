"use client";

import clsx from "clsx";
import { useSession } from "next-auth/react";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { getChatMessages, markMessagesAsRead, subscribeToChatMessages } from "@/lib/database/chat";
import { getUser } from "@/lib/database/getUser";
import { Avatar } from "@/primitives/Avatar";
import { Spinner } from "@/primitives/Spinner";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import styles from "./ChatWindow.module.css";

interface Props extends ComponentProps<"div"> {
  userId: string;
}

export function ChatWindow({ userId, className, ...props }: Props) {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!session?.user?.info?.id || !userId) return;

    const loadData = async () => {
      setLoading(true);
      
      // Load user info and messages
      const [userResult, messagesResult] = await Promise.all([
        getUser(userId),
        getChatMessages(session.user.info.id, userId),
      ]);

      if (userResult) {
        setUser(userResult);
      }

      if (messagesResult.data) {
        setMessages(messagesResult.data);
      }

      // Mark messages as read
      await markMessagesAsRead(userId, session.user.info.id);

      setLoading(false);
    };

    loadData();

    // Subscribe to real-time messages
    const subscription = subscribeToChatMessages(session.user.info.id, (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
      
      // Mark as read if it's from the current chat partner
      if (newMessage.sender_id === userId) {
        markMessagesAsRead(userId, session.user.info.id);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [session?.user?.info?.id, userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (loading) {
    return (
      <div className={clsx(className, styles.window)} {...props}>
        <div className={styles.loading}>
          <Spinner />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={clsx(className, styles.window)} {...props}>
        <div className={styles.emptyState}>
          <p>User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(className, styles.window)} {...props}>
      <div className={styles.header}>
        <Avatar
          name={user.name}
          src={user.avatar}
          color={user.color}
          size={32}
        />
        <div className={styles.userInfo}>
          <span className={styles.userName}>{user.name}</span>
          <span className={styles.userStatus}>Online</span>
        </div>
      </div>

      <div className={styles.messages}>
        {messages.length === 0 ? (
          <div className={styles.emptyMessages}>
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isOwn={message.sender_id === session?.user?.info?.id}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputContainer}>
        <ChatInput
          receiverId={userId}
          onMessageSent={(message) => {
            setMessages(prev => [...prev, message]);
          }}
        />
      </div>
    </div>
  );
}