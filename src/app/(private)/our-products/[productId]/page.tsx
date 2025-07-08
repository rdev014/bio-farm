
import { notFound } from 'next/navigation';
import type { Metadata } from 'next'
import SwiperCarousel from '@/components/General/SwiperCarousel';
import { getProductById } from '@/actions/products';

type Props = {
  params: Promise<{ productId: string }>
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  // read route params
  const { productId } = await params

  // fetch data
  const product = await getProductById(productId)


  if (!product) {
    return {
      title: 'Blog Not Found',
      description: 'The blog post you are looking for does not exist.',

    }
  }

  return {
    title: product.name ?? `Product: ${product.name}`,
    description: product.description ?? "",
  }
}
export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const { productId } = await params
  const product = await getProductById(productId)
  if (!product) notFound();
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        <header className="bg-green-600 text-white py-6 mb-6 rounded-lg">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Arkin Organics</h1>
            <p className="text-lg">Purely Natural, Organically Yours</p>
          </div>
        </header>

        <div className="bg-white rounded-lg shadow-md p-6 md:flex gap-6">
          <div className="md:w-1/2">
            <SwiperCarousel name={product.name} images={product.images} />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-green-600 font-bold text-xl mb-2">
              ${product.price - (product.discount || 0)}
              {product.discount ? (
                <span className="text-gray-400 line-through ml-2">
                  ${product.price}
                </span>
              ) : null}
            </p>
            <p className="text-sm text-gray-500 mb-2">SKU: {product.sku}</p>
            <p className="text-sm text-gray-500 mb-2">Brand: {product.brand}</p>
            <p className="text-sm text-gray-500 mb-2">Stock: {product.stock}</p>
            <p className="text-sm text-gray-500 mb-2">
              Weight: {product.weight} {product.unit}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Category: {product.category}
            </p>
            {product.tags.length > 0 && (
              <p className="text-sm text-gray-500 mb-2">
                Tags: {product.tags.join(", ")}
              </p>
            )}
            {product.specifications.size > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Specifications</h3>
                <ul className="list-disc pl-5">
                  {[...product.specifications.entries()].map(([key, value]) => (
                    <li key={key} className="text-sm text-gray-600">
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}