'use client';

import { apiClient } from '@/lib/api-client';
import { TeamMember } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

async function getTeamMembers() {
  const response = await apiClient.get<TeamMember[]>('/team-members');

  return response.data;
}

export function useTeamMembers() {
  return useQuery({
    queryKey: ['team-members'],
    queryFn: getTeamMembers,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}
