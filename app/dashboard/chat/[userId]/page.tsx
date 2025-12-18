"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { Chat } from "@/components/Chat";
import { users } from "@/data/users";

export default function ChatPage() {
  const { userId } = useParams();
  const { data: session } = useSession();
  const currentUser = session?.user?.info;
  const user = users.find((u) => u.id === userId);

  if (!user || !currentUser) {
    return <div>Loading...</div>; // Or a more appropriate loading/error state
  }

  return <Chat user={user} currentUser={currentUser} />;
}
