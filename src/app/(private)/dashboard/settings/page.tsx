import { handleSignOut } from '@/actions/user'
import { SignOutButton } from '@/components/General/SignOutButton'
import React from 'react'

export default function page() {
  return (
    <div>Setting page

        <SignOutButton  handleSignOut={handleSignOut} />
    </div>
  )
}
