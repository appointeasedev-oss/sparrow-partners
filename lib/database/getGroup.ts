import { supabase } from "./supabase";

import { supabase } from "./supabase";

/**
 * Get Group
 *
 * Gets group from Supabase database
 *
 * @param id - The group's id
 */
export async function getGroup(id: string) {
  // Special cases for `@everyone` and `@here` as they're not "real" groups
  if (id === "everyone") {
    return {
      id: "everyone",
      name: "Everyone",
    };
  }

  if (id === "here") {
    return {
      id: "here",
      name: "Here",
    };
  }

  const { data: group, error } = await supabase
    .from('groups')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !group) {
    return null;
  }

  // Special cases for `@everyone` and `@here` as they're not "real" groups
  if (id === "everyone") {
    return {
      id: "everyone",
      name: "Everyone",
    };
  }

  if (id === "here") {
    return {
      id: "here",
      name: "Here",
    };
  }

  const { data: group, error } = await supabase
    .from('groups')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !group) {
    return null;
  }

  return group;
}
