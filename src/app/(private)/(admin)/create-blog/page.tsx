
import { getCategories } from '@/actions/category';
import CreateBlog from '@/components/createBlog/createBlog'
import { getSession } from '@/lib/getSession';


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
