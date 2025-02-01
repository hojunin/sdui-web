import { useQuery } from '@apollo/client';
import { GET_MENUS } from '@/lib/graphql/queries';
import type { MenusResponse } from '@/lib/graphql/types';

export function useMenus() {
  const { data, loading, error } = useQuery<MenusResponse>(GET_MENUS);

  return {
    menus: data?.menus || [],
    loading,
    error,
  };
}
