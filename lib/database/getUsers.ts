import { supabase } from "./supabase";

type Props = {
  userIds?: string[];
  search?: string;
};

/**
 * Get Users
 *
 * Gets users from Supabase database
 *
 * @param userIds - The user ids to get
 * @param search - The term to filter your users by, checks users' ids and names
 */
export async function getUsers({ userIds, search }: Props = {}) {
  let query = supabase.from('users').select(`
    *,
    user_groups!inner(group_id)
  `);

  if (userIds) {
    query = query.in('id', userIds);
  }

  if (search) {
    const term = search.toLowerCase();
    query = query.or(`name.ilike.%${term}%,id.ilike.%${term}%`);
  }

  const { data: users, error } = await query;

  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }

  // Transform data to include groupIds
  return users?.map(user => ({
    ...user,
    groupIds: user.user_groups?.map((ug: any) => ug.group_id) || [],
  })) || [];
}

/**
 * Get users in the same groups as the current user
 */
export async function getUsersInSameGroups(currentUserId: string) {
  const { data: userGroups } = await supabase
    .from('user_groups')
    .select('group_id')
    .eq('user_id', currentUserId);

  if (!userGroups?.length) {
    return [];
  }

  const groupIds = userGroups.map(ug => ug.group_id);

  const { data: users, error } = await supabase
    .from('users')
    .select(`
      *,
      user_groups!inner(group_id)
    `)
    .in('user_groups.group_id', groupIds)
    .neq('id', currentUserId);

  if (error) {
    console.error('Error fetching users in same groups:', error);
    return [];
  }

  // Remove duplicates and transform data
  const uniqueUsers = users?.reduce((acc: any[], user) => {
    if (!acc.find(u => u.id === user.id)) {
      acc.push({
        ...user,
        groupIds: user.user_groups?.map((ug: any) => ug.group_id) || [],
      });
    }
    return acc;
  }, []) || [];

  return uniqueUsers;
}