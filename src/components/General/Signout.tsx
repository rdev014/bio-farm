'use server'
import { signOut } from "@/auth";


export default async function Signout() {
  return (
    <div>
      <form
        className="space-y-6"
        action={async () => {
            'use server'
          await signOut();
        }}
      >
        <button type="submit">SignOut</button>
      </form>
    </div>
  );
}
