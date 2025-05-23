import React from "react";
import Header from "./Header";
import { getSession } from "@/lib/getSession";

export default async function HeaderProvider() {
  const session = await getSession();
  const user = session?.user;
  console.log(user);

  return (
    <Header
      user={{ name: user?.name ?? undefined, email: user?.email ?? undefined }}
    />
  );
}
