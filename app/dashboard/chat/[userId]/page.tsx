"use client";

import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Chat } from "@/components/Chat";
import { users } from "@/data/users";
import { getColor } from "@/data/colors";

export default function ChatPage() {
  const { userId } = useParams();
  const { data: session } = useSession();
  const currentUser = session?.user?.info;
  const user = users.find((u) => u.id === userId);

  if (!user || !currentUser) {
    return <div>Loading...</div>;
  }

  // Add color to user since users data omits it
  const userWithColor = { ...user, color: getColor(user.id) };
  const currentUserWithColor = { ...currentUser, color: getColor(currentUser.id) };

  return <Chat user={userWithColor} currentUser={currentUserWithColor} />;
}
