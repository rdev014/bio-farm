
import Farms from '@/components/dashboard/profile/Farms'
import { getSession } from '@/lib/getSession';
import React from 'react'

export default async function page() {
  const session = await getSession();
  const user = session?.user;
  return (
    <Farms userId={user?.id} />
  )
}
