import { getCategories } from "@/actions/category";
import FetchCategory from "@/components/FetchCategory/FetchCategory";
import { getSession } from "@/lib/getSession";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL!),
  title: "Admin Panel | Manage Categories | Arkin Organics",
  description: "Admin dashboard for managing blog and product categories. Create, update, or organize content categories for streamlined content management at Arkin Organics.",
};

export default async function Page() {
  const categories = await getCategories();
  const session = await getSession();
  const user = session?.user;
console.log(categories);

  return (
    <div>
      <FetchCategory user_id={user?.id} categories={categories.filter((c): c is NonNullable<typeof c> => c !== undefined)} />
    </div>
  );
}