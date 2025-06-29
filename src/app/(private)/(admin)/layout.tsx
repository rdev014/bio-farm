
import { getSession } from '@/lib/getSession';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react'


export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL!),
  title: "Arkin Admin Panel | Backend Management",
  description: "Arkin Organics admin layout for centralized control over blogs, products, orders, users, and platform configurations. Internal use only.",
};


export default async function AdminRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getSession();
    const user = session?.user;
    if (!user) return redirect("/sign-in");
    if (user?.role !== "admin") return redirect("/dashboard");
    return (
        <>
            {children}
        </>


    )
}
