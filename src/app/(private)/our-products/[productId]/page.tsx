import { notFound } from 'next/navigation';
import type { Metadata } from 'next'
import SwiperCarousel from '@/components/General/SwiperCarousel';
import { getProductById } from '@/actions/products';
import { AddToWishlistButton } from '@/components/dashboard/products/AddToWishlistButton';
import { AddToCartButton } from '@/components/dashboard/products/AddToCartButton';
import {
  Star,
  Shield,
  Truck,
  RefreshCw,
  Award,
  Leaf,
  Package,
  Scale,
  Tag,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

type Props = {
  params: Promise<{ productId: string }>
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const { productId } = await params
  const product = await getProductById(productId);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
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

  const finalPrice = product.discount ? product.price - product.discount : product.price;
  const hasDiscount = !!product.discount && product.discount > 0;
  const discountPercentage = hasDiscount && product.price > 0
    ? Math.round(((product.discount ?? 0)))
    : 0;
  const isInStock = product.stock > 0;
  const isLowStock = product.stock <= 5 && product.stock > 0;

  const renderStars = (rating: number = 4.5) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-700 to-emerald-700 text-white py-10 mb-12 shadow-xl rounded-b-3xl">
        <div className="container mx-auto px-6 flex items-center gap-5">
          <div className="p-3 bg-white/30 rounded-xl shadow-md">
            <Leaf className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Arkin Organics</h1>
            <p className="text-green-100 text-lg font-medium">Purely Natural, Organically Yours</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-6xl">


        {/* Main Product Section */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-12">
          <div className="grid lg:grid-cols-2 gap-12 p-10">
            {/* Product Images */}
            <div className="space-y-6">
              <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-md p-2 flex items-center justify-center min-h-[350px]">
                <SwiperCarousel name={product.name} images={product.images} />
              </div>

              {/* Trust Badges */}
              <div className="flex gap-4 mt-4">
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl shadow-sm border border-green-100">
                  <Leaf className="w-6 h-6 text-green-600" />
                  <span className="text-base font-semibold text-green-800">100% Organic</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl shadow-sm border border-blue-100">
                  <Shield className="w-6 h-6 text-blue-600" />
                  <span className="text-base font-semibold text-blue-800">Quality Assured</span>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              {/* Title and Rating */}
              <div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight leading-tight">{product.name}</h2>
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(4.5)}
                    </div>
                    <span className="text-base text-gray-500">(4.5) • 127 reviews</span>
                  </div>
                  <div className="flex items-center gap-1 text-base text-green-700 font-semibold bg-green-100 px-3 py-1 rounded-full">
                    <Award className="w-5 h-5" />
                    <span>Best Seller</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-end gap-4 mb-2">
                  <span className="text-4xl font-extrabold text-green-700">
                    ${finalPrice.toFixed(2)}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-2xl text-gray-400 line-through font-semibold">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="bg-red-500 text-white px-4 py-1 rounded-full text-base font-bold shadow-sm animate-pulse">
                        {discountPercentage}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p className="text-base text-gray-500">Price per {product.unit}</p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mt-2">
                {isInStock ? (
                  <>
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="text-green-700 font-semibold text-lg">
                      {isLowStock ? `Only ${product.stock} left in stock` : 'In Stock'}
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-6 h-6 text-red-600" />
                    <span className="text-red-600 font-semibold text-lg">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">Description</h3>
                <p className="text-gray-700 leading-relaxed text-base">{product.description}</p>
              </div>

              {/* Product Details Grid */}
              <div className="grid grid-cols-2 gap-4 relative group">
                {/* Floating Action Bar (Wishlist/Cart) */}
                <div
                  className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 flex flex-col md:flex-row gap-3 md:gap-4 p-2 md:p-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 hover:opacity-100 focus-within:opacity-100"
                  tabIndex={0}
                  aria-label="Quick actions"
                >
                  {/* <div className="w-full md:w-auto">
                    <div className="rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm px-4 py-2 transition-colors duration-150 w-full md:w-auto">
                      <AddToWishlistButton
                        name={product.name}
                        price={product.price}
                        images={product.images}
                        productId={product._id.toString()}
                      />
                    </div>
                  </div> */}
                  {/* <div className="w-full md:w-auto">
                    <div className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold border border-emerald-700 shadow px-4 py-2 transition-colors duration-150 w-full md:w-auto">
                      <AddToCartButton
                        productId={product._id.toString()}
                      />
                    </div>
                  </div> */}
                </div>
                {/* Product Info Cards */}
                <div className="bg-gray-50 rounded-xl p-5 shadow-sm flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="w-5 h-5 text-gray-600" />
                    <span className="text-base font-semibold text-gray-700">SKU</span>
                  </div>
                  <span className="text-base text-gray-600">{product.sku}</span>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 shadow-sm flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-5 h-5 text-gray-600" />
                    <span className="text-base font-semibold text-gray-700">Brand</span>
                  </div>
                  <span className="text-base text-gray-600">{product.brand}</span>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 shadow-sm flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Scale className="w-5 h-5 text-gray-600" />
                    <span className="text-base font-semibold text-gray-700">Weight</span>
                  </div>
                  <span className="text-base text-gray-600">{product.weight} {product.unit}</span>
                </div>

                <div className="bg-gray-50 rounded-xl p-5 shadow-sm flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Tag className="w-5 h-5 text-gray-600" />
                    <span className="text-base font-semibold text-gray-700">Category</span>
                  </div>
                  <span className="text-base text-gray-600">{product.category}</span>
                </div>
              </div>

              {/* Tags */}
              {product.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-1 bg-green-200 text-green-900 rounded-full text-base font-semibold shadow-sm hover:bg-green-300 transition-colors duration-150"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-5 pt-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg shadow-md transition-colors duration-150 flex items-center justify-center">
                      <AddToCartButton productId={product._id.toString()} />
                    </div>
                  </div>
                  <div>
                    <div className="py-3 px-5 rounded-xl bg-white border border-emerald-600 text-emerald-700 font-bold text-lg shadow-md hover:bg-emerald-50 transition-colors duration-150 flex items-center justify-center">
                      <AddToWishlistButton
                        name={product.name}
                        price={finalPrice}
                        images={product.images}
                        productId={product._id.toString()}
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="bg-blue-50 rounded-xl p-5 flex items-center gap-4 shadow-sm border border-blue-100 mt-2">
                  <Truck className="w-7 h-7 text-blue-600" />
                  <div>
                    <span className="font-bold text-blue-800 text-lg block mb-1">Free Shipping</span>
                    <span className="text-base text-blue-700">Orders over $50 • Delivery in 2-5 business days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {product.specifications.size > 0 && (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-10 mb-12">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-8 tracking-tight">Specifications</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...product.specifications.entries()].map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded-xl p-5 shadow-sm flex flex-col gap-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Info className="w-5 h-5 text-gray-600" />
                    <span className="font-semibold text-gray-700">{key}</span>
                  </div>
                  <span className="text-gray-600 text-base">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trust & Security */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-10 mb-12">
          <h3 className="text-2xl font-extrabold text-gray-900 mb-8 tracking-tight">Why Choose Arkin Organics?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center flex flex-col items-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-5 shadow-md">
                <Leaf className="w-10 h-10 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">100% Organic</h4>
              <p className="text-gray-600 text-base">Certified organic products with no harmful chemicals</p>
            </div>

            <div className="text-center flex flex-col items-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-5 shadow-md">
                <Shield className="w-10 h-10 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Quality Guaranteed</h4>
              <p className="text-gray-600 text-base">Rigorous testing and quality control processes</p>
            </div>

            <div className="text-center flex flex-col items-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-5 shadow-md">
                <RefreshCw className="w-10 h-10 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">30-Day Returns</h4>
              <p className="text-gray-600 text-base">Not satisfied? Return within 30 days for full refund</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}