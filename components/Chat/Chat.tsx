import { Avatar } from "@/primitives/Avatar";
import { Button } from "@/primitives/Button";
import { Input } from "@/primitives/Input";
import { User } from "@/types";
import styles from "./Chat.module.css";

interface ChatProps {
  user: User;
  currentUser: User;
}

export function Chat({ user, currentUser }: ChatProps) {
  const messages: any[] = []; // In a real app, you would fetch messages from a database

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.userInfo}>
          <Avatar src={user.avatar} name={user.name} />
          <h2>{user.name}</h2>
        </div>
      </header>
      <main className={styles.messages}>
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${
                message.senderId === currentUser.id ? styles.currentUser : ""
              }`}
            >
              <div className={styles.messageContent}>
                <p>{message.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No messages yet.</p>
        )}
      </main>
      <footer className={styles.footer}>
        <form className={styles.form}>
          <Input className={styles.input} placeholder="Type a message..." />
          <Button type="submit">Send</Button>
        </form>
      </footer>
    </div>
  );
}
