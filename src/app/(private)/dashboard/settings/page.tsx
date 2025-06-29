import { handleSignOut } from '@/actions/user'
import { SignOutButton } from '@/components/General/Header/SignOutButton'
import { FooterUnsubscribe } from '@/components/General/Newsletters'
import React from 'react'

export default function page() {
  return (
    <div>Setting page
      <FooterUnsubscribe />
      <div>
        <SignOutButton handleSignOut={handleSignOut} />
      </div>
    </div>
  )
}
