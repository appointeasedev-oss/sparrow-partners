import { supabase } from "./supabase";

type Props = {
  groupIds?: string[];
  search?: string;
};

type GroupWithMembers = {
  id: string;
  name: string;
  created_at: string | null;
  memberIds: string[];
};

/**
 * Get Groups
 *
 * Gets groups from Supabase database
 *
 * @param groupIds - The group ids to get
 * @param search - The term to filter your users by, checks users' ids and names
 */
export async function getGroups({ groupIds, search }: Props = {}): Promise<
  (GroupWithMembers | null)[]
> {
  let query = supabase.from('groups').select(`
    *,
    user_groups(user_id)
  `);

  if (groupIds) {
    query = query.in('id', groupIds);
  }

  if (search) {
    const term = search.toLowerCase();
    query = query.or(`name.ilike.%${term}%,id.ilike.%${term}%`);
  }

  const { data: groups, error } = await query;

  if (error) {
    console.error('Error fetching groups:', error);
    return [];
  }

  return groups?.map(group => ({
    ...group,
    memberIds: group.user_groups?.map((ug: any) => ug.user_id) || [],
  })) || [];
}
