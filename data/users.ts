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
    groupIds: ["Mail", "Shubham", "Blanxiro", "Khushank"],
    password: "Satvik#Testplay#2025",
  },
  {
    id: "shubham@sparrow.com",
    name: "Shubham",
    avatar: "https://liveblocks.io/avatars/avatar-2.png",
    groupIds: ["Shubham"],
    password: "Shubh@m$parr0w",
  },
  {
    id: "khushank@sparrow.com",
    name: "Khushank",
    avatar: "https://liveblocks.io/avatars/avatar-3.png",
    groupIds: ["Blanxiro", "Khushank"],
    password: "Kushankbhaikapassword",
  },
  {
    id: "shreya@sparrow.com",
    name: "Shreya",
    avatar: "https://liveblocks.io/avatars/avatar-4.png",
    groupIds: ["Blanxiro"],
    password: "Shr3eya#2025",
  },
];
