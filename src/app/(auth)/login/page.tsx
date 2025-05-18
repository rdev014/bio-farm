import { signIn } from '@/auth';
import React from 'react'

export default function page() {
  return (
    <div>
        <form
      action={async () => {
        "use server"
        await signIn()
      }}
    >
      <button type="submit">Sign in</button>
    </form>
    </div>
  )
}
