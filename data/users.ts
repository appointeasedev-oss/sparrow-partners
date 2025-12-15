import { User } from "@/types";

/**
 * This array simulates a database consisting of a list of users.
 * After signing up with your auth solution (e.g. GitHub, Auth0)
 * place your user info in an object, with the email address you used
 * as the id.
 * The groupIds are the names of the groups the user is part of.
 * Group info is in /data/groups.ts
 */
export const users: Omit<User, "color">[] = [
  {
    id: "charlie.layne@sparrow.com",
    name: "Charlie Layne",
    avatar: "https://liveblocks.io/avatars/avatar-2.png",
    groupIds: ["product", "engineering", "design"],
    password: "password",
  },
  {
    id: "mislav.abha@sparrow.com",
    name: "Mislav Abha",
    avatar: "https://liveblocks.io/avatars/avatar-3.png",
    groupIds: ["engineering"],
    password: "password",
  },
  {
    id: "tatum.paolo@sparrow.com",
    name: "Tatum Paolo",
    avatar: "https://liveblocks.io/avatars/avatar-4.png",
    groupIds: ["engineering", "design"],
    password: "password",
  },
  {
    id: "anjali.wanda@sparrow.com",
    name: "Anjali Wanda",
    avatar: "https://liveblocks.io/avatars/avatar-5.png",
    groupIds: ["product"],
    password: "password",
  },
  {
    id: "emil.joyce@sparrow.com",
    name: "Emil Joyce",
    avatar: "https://liveblocks.io/avatars/avatar-6.png",
    groupIds: ["product", "design"],
    password: "password",
  },
];
