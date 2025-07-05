import DashboardMain from '@/components/dashboard/DasnboardMain';
import { getSession } from '@/lib/getSession';
import React from 'react'

export default async function page() {
  const session = await getSession();
  const user = session?.user;
  
    const allowedRoles = ["user", "admin", "moderator", "guest"] as const;
    type AllowedRole = typeof allowedRoles[number];
    const safeUser = {
        ...user,
        name: user?.name ?? '',
        email: user?.email ?? '',
        image: user?.image ?? '',
        role: allowedRoles.includes(user?.role as AllowedRole) ? user?.role as AllowedRole : ''

    };
  return (
    <DashboardMain user={safeUser} />
  )
}
