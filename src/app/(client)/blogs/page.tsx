import { getBlogs } from "@/actions/blog";
import Blogs from "@/components/blogs/Blogs";



export default async function page() {
    const blogs = await getBlogs();

    return (
        <Blogs blogs={blogs} />
    )
}
