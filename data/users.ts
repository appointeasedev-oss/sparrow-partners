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
    id: "satvik.singh@sparrow.com",
    name: "Satvik Singh",
    avatar: "https://liveblocks.io/avatars/avatar-1.png",
    groupIds: ["Mail", "Shubham", "Blanxiro"],
    password: "password",
  },
  {
    id: "shubham@sparrow.com",
    name: "Shubham",
    avatar: "https://liveblocks.io/avatars/avatar-2.png",
    groupIds: ["Shubham"],
    password: "password",
  },
  {
    id: "kushank@sparrow.com",
    name: "Kushank",
    avatar: "https://liveblocks.io/avatars/avatar-3.png",
    groupIds: ["Blanxiro"],
    password: "password",
  },
  {
    id: "shreya@sparrow.com",
    name: "Shreya",
    avatar: "https://liveblocks.io/avatars/avatar-4.png",
    groupIds: ["Blanxiro"],
    password: "password",
  },
];
