/*
  # Migrate Users and Groups Data

  1. New Tables
    - Populate `users` table with existing user data
    - Populate `groups` table with existing group data  
    - Populate `user_groups` table with user-group relationships

  2. Data Migration
    - Insert all hardcoded users from data/users.ts
    - Insert all hardcoded groups from data/groups.ts
    - Create proper relationships between users and groups

  3. Security
    - All tables already have RLS enabled
    - Policies are already in place
*/

-- Insert users data
INSERT INTO users (id, name, avatar, color, password) VALUES
('satvik.singh@sparrow.com', 'Satvik Singh', 'https://liveblocks.io/avatars/avatar-1.png', '#0077ff', 'Satvik#Testplay#2025'),
('shubham@sparrow.com', 'Shubham', 'https://liveblocks.io/avatars/avatar-2.png', '#00bbff', 'Shubh@m$parr0w'),
('khushank@sparrow.com', 'Khushank', 'https://liveblocks.io/avatars/avatar-3.png', '#00cc88', 'Kushankbhaikapassword'),
('shreya@sparrow.com', 'Shreya', 'https://liveblocks.io/avatars/avatar-4.png', '#88cc11', 'Shr3eya#2025')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  avatar = EXCLUDED.avatar,
  color = EXCLUDED.color,
  password = EXCLUDED.password;

-- Insert groups data
INSERT INTO groups (id, name) VALUES
('Mail', 'Mail'),
('Shubham', 'Shubham'),
('Blanxiro', 'Blanxiro'),
('Khushank', 'Khushank')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name;

-- Insert user-group relationships
INSERT INTO user_groups (user_id, group_id) VALUES
-- Satvik Singh groups
('satvik.singh@sparrow.com', 'Mail'),
('satvik.singh@sparrow.com', 'Shubham'),
('satvik.singh@sparrow.com', 'Blanxiro'),
('satvik.singh@sparrow.com', 'Khushank'),
-- Shubham groups
('shubham@sparrow.com', 'Shubham'),
-- Khushank groups
('khushank@sparrow.com', 'Blanxiro'),
('khushank@sparrow.com', 'Khushank'),
-- Shreya groups
('shreya@sparrow.com', 'Blanxiro')
ON CONFLICT (user_id, group_id) DO NOTHING;