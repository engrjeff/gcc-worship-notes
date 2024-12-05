'use server';

import prisma from '@/lib/db';

export async function getTeamMembers() {
  const members = await prisma.teamMember.findMany();

  return members;
}
