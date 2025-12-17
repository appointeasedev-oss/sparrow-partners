"use client";

import clsx from "clsx";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { ComponentProps } from "react";
import { Avatar } from "@/primitives/Avatar";
import styles from "./ChatMessage.module.css";

interface Props extends ComponentProps<"div"> {
  message: {
    id: string;
    message: string;
    created_at: string;
    sender?: {
      id: string;
      name: string;
      avatar: string | null;
      color: string;
    };
  };
  isOwn: boolean;
}

export function ChatMessage({ message, isOwn, className, ...props }: Props) {
  const date = new Date(message.created_at);

  return (
    <div
      className={clsx(className, styles.message, {
        [styles.messageOwn]: isOwn,
      })}
      {...props}
    >
      {!isOwn && message.sender && (
        <Avatar
          name={message.sender.name}
          src={message.sender.avatar}
          color={message.sender.color}
          size={28}
          className={styles.avatar}
        />
      )}
      
      <div className={styles.content}>
        <div className={styles.bubble}>
          <p className={styles.text}>{message.message}</p>
        </div>
        <span className={styles.timestamp}>
          {formatDistanceToNow(date, { addSuffix: true })}
        </span>
      </div>
    </div>
  );
}