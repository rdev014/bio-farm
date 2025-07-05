
import { getCategories } from '@/actions/category';
import CreateBlog from '@/components/createBlog/createBlog'
import { getSession } from '@/lib/getSession';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL!),
  title: "Admin Panel | Create Blog Post | Arkin Organics",
  description: "Publish new content to the Arkin Organics blog. Use the admin interface to create informative articles on organic fertilizers, sustainability, and eco-friendly farming.",
};

export default async function page() {
  const categories = await getCategories();
  const session = await getSession();
   const user = session?.user;
  return (
    <div>
      <CreateBlog user_id={user?.id} categories={categories.filter((c): c is NonNullable<typeof c> => c !== undefined)} />
    </div>
  )
}
