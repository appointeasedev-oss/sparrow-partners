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
    avatar: "https://olcojkaokbyrbqjueboo.supabase.co/storage/v1/object/public/fvd/pic.jpg",
    groupIds: ["all-team", "founders", "tech", "marketing", "finance", "suggestions"],
    password: "Satvik#Founder#2025",
  },
  {
    id: "rishabh.tiwari@sparrow.com",
    name: "Rishabh Tiwari",
    avatar: "https://liveblocks.io/avatars/avatar-2.png",
    groupIds: ["all-team", "founders", "tech", "marketing", "finance", "suggestions"],
    password: "Rishabh#CEO#2025",
  },
  {
    id: "mohith.am@sparrow.com",
    name: "Mohith A M",
    avatar: "https://liveblocks.io/avatars/avatar-3.png",
    groupIds: ["all-team", "founders", "tech", "suggestions"],
    password: "Mohith#TechLead#2025",
  },
  {
    id: "gauransh.rajput@sparrow.com",
    name: "Gauransh Rajput",
    avatar: "https://liveblocks.io/avatars/avatar-4.png",
    groupIds: ["all-team", "marketing", "suggestions"],
    password: "Gauransh#Marketing#2025",
  },
  {
    id: "durvang@sparrow.com",
    name: "Durvang",
    avatar: "https://liveblocks.io/avatars/avatar-5.png",
    groupIds: ["all-team", "founders", "tech", "suggestions"],
    password: "Durvang#CTO#2025",
  },
];
