import AppLayout from '@/components/General/appLayout'
import { getSession } from '@/lib/getSession';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react'


export const metadata: Metadata = {
  title: "Private Page | Arkin Organics",
  description: "This section of Arkin Organics is restricted to authorized personnel only. Access requires valid authentication credentials.",
};


export default async function AppRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getSession();
    const user = session?.user;
    if (!user) return redirect("/sign-in");
    // Ensure user.name is never null and email is never null
    const allowedRoles = ["user", "admin", "moderator", "guest"] as const;
    type AllowedRole = typeof allowedRoles[number];
    const safeUser = { 
        ...user, 
        name: user?.name ?? undefined, 
        email: user?.email ?? undefined,
        image: user?.image ?? undefined,
        role: allowedRoles.includes(user?.role as AllowedRole) ? user?.role as AllowedRole : undefined

    };
    return (
        <AppLayout user={safeUser}>
            {children}
        </AppLayout>
    )
}
