import { getCategories } from "@/actions/category";
import FetchCategory from "@/components/FetchCategory/FetchCategory";
import { getSession } from "@/lib/getSession";

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