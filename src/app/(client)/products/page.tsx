import { getCategories } from "@/actions/category";
import { getPublicProducts } from "@/actions/products";
import Image from "next/image";
import Link from "next/link";

type SearchParams = {
  page?: string;
  limit?: string;
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  order?: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedParams = await searchParams;
  const categories = await getCategories();

  const page = parseInt(resolvedParams.page || "1");
  const limit = parseInt(resolvedParams.limit || "12");
  const search = resolvedParams.search || "";
  const category = resolvedParams.category || "";
  const minPrice = parseFloat(resolvedParams.minPrice || "0");
  const maxPrice = parseFloat(resolvedParams.maxPrice || "1000000");
  const sort = resolvedParams.sort || "createdAt";
  const order = resolvedParams.order || "desc";


  const { products, pages } = await getPublicProducts({
    page,
    limit,
    search,
    category,
    minPrice,
    maxPrice,
    sort,
    order,
  });

  const plainSearchParams = {
    page: resolvedParams?.page,
    limit: resolvedParams?.limit,
    search: resolvedParams?.search,
    category: resolvedParams?.category,
    minPrice: resolvedParams?.minPrice,
    maxPrice: resolvedParams?.maxPrice,
    sort: resolvedParams?.sort,
    order: resolvedParams?.order,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Arkin Organics</h1>
          <p className="text-lg">Purely Natural, Organically Yours</p>
        </div>
      </header>

      <section className="container mx-auto px-4 py-6">
        <form className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            name="search"
            placeholder="Search products..."
            defaultValue={search}
            className="border rounded-lg p-2 flex-1"
          />
          <select
            name="category"
            defaultValue={category}
            className="border rounded-lg p-2"
          >
            <option value="">All Categories</option>
            {categories.map((cat) =>
              cat ? (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ) : null
            )}
          </select>
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            defaultValue={minPrice}
            className="border rounded-lg p-2 w-24"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            defaultValue={maxPrice}
            className="border rounded-lg p-2 w-24"
          />
          <select name="sort" defaultValue={sort} className="border rounded-lg p-2">
            <option value="createdAt">Date</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
          <select name="order" defaultValue={order} className="border rounded-lg p-2">
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Filter
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.productId}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              <Image
                src={product.images[0] || "/placeholder.jpg"}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600 text-sm line-clamp-2">
                {product.description}
              </p>
              <p className="text-green-600 font-bold mt-2">
                ${product.price - (product.discount || 0)}
                {product.discount ? (
                  <span className="text-gray-400 line-through ml-2">
                    ${product.price}
                  </span>
                ) : null}
              </p>
              <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              <Link
                href={`/products/${product.productId}`}
                className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-center"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <nav className="flex gap-2">
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={{
                  pathname: "/products",
                  query: { ...plainSearchParams, page: p.toString() },
                }}
                className={`px-4 py-2 rounded-lg ${p === page ? "bg-green-600 text-white" : "bg-gray-200"
                  }`}
              >
                {p}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </div>
  );
}
