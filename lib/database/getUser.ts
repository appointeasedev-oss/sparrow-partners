import { supabase } from "./supabase";

/**
 * Get User
 *
 * Gets user from Supabase database
 *
 * @param userId - The user's id
 */
export async function getUser(userId: string) {
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !user) {
    console.warn(`
ERROR: User "${userId}" was not found in database.
`);
    return null;
  }

  // Get user's group IDs
  const { data: userGroups } = await supabase
    .from('user_groups')
    .select('group_id')
    .eq('user_id', userId);

  const groupIds = userGroups?.map(ug => ug.group_id) || [];

  return {
    ...user,
    groupIds,
  };
}
