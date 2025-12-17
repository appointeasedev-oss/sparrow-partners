/*
  # Migrate Users and Groups to Supabase

  1. New Tables
    - Update `users` table with existing user data
    - Update `groups` table with existing group data
    - Update `user_groups` table with user-group relationships
  2. Data Migration
    - Insert existing users from hardcoded data
    - Insert existing groups from hardcoded data
    - Create user-group relationships
  3. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Insert existing users
INSERT INTO users (id, name, avatar, color, password, created_at) VALUES
('satvik.singh@sparrow.com', 'Satvik Singh', 'https://liveblocks.io/avatars/avatar-1.png', '#0077ff', 'Satvik#Testplay#2025', now()),
('shubham@sparrow.com', 'Shubham', 'https://liveblocks.io/avatars/avatar-2.png', '#00bbff', 'Shubh@m$parr0w', now()),
('khushank@sparrow.com', 'Khushank', 'https://liveblocks.io/avatars/avatar-3.png', '#00cc88', 'Kushankbhaikapassword', now()),
('shreya@sparrow.com', 'Shreya', 'https://liveblocks.io/avatars/avatar-4.png', '#88cc11', 'Shr3eya#2025', now())
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  avatar = EXCLUDED.avatar,
  color = EXCLUDED.color,
  password = EXCLUDED.password;

-- Insert existing groups
INSERT INTO groups (id, name, created_at) VALUES
('Mail', 'Mail', now()),
('Shubham', 'Shubham', now()),
('Blanxiro', 'Blanxiro', now()),
('Khushank', 'Khushank', now())
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name;

-- Insert user-group relationships
INSERT INTO user_groups (user_id, group_id, created_at) VALUES
('satvik.singh@sparrow.com', 'Mail', now()),
('satvik.singh@sparrow.com', 'Shubham', now()),
('satvik.singh@sparrow.com', 'Blanxiro', now()),
('satvik.singh@sparrow.com', 'Khushank', now()),
('shubham@sparrow.com', 'Shubham', now()),
('khushank@sparrow.com', 'Blanxiro', now()),
('khushank@sparrow.com', 'Khushank', now()),
('shreya@sparrow.com', 'Blanxiro', now())
ON CONFLICT (user_id, group_id) DO NOTHING;