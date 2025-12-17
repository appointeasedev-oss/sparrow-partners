"use client";

import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { sendMessage } from "@/lib/database/chat";
import { Button } from "@/primitives/Button";
import { Input } from "@/primitives/Input";
import styles from "./ChatInput.module.css";

interface Props {
  receiverId: string;
  onMessageSent: (message: any) => void;
}

export function ChatInput({ receiverId, onMessageSent }: Props) {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !session?.user?.info?.id || sending) {
      return;
    }

    setSending(true);
    
    const result = await sendMessage(session.user.info.id, receiverId, message);
    
    if (result.data) {
      onMessageSent(result.data);
      setMessage("");
    }
    
    setSending(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        className={styles.input}
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={sending}
      />
      <Button
        type="submit"
        disabled={!message.trim() || sending}
        className={styles.button}
      >
        Send
      </Button>
    </form>
  );
}