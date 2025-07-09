import { notFound } from 'next/navigation';
import type { Metadata } from 'next'
import SwiperCarousel from '@/components/General/SwiperCarousel';
import { getProductById } from '@/actions/products';
import {
  Star,
  Shield,
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
    ? Math.round(((product.discount ?? 0) / product.price) * 100)
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-8 mb-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-lg">
              <Leaf className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Arkin Organics</h1>
              <p className="text-green-100">Purely Natural, Organically Yours</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-7xl">


        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-2xl overflow-hidden">
                <SwiperCarousel name={product.name} images={product.images} />
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                  <Leaf className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">100% Organic</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Quality Assured</span>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Title and Rating */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h2>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(4.5)}
                    </div>
                    <span className="text-sm text-gray-600">(4.5) • 127 reviews</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <Award className="w-4 h-4" />
                    <span>Best Seller</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-3xl font-bold text-green-600">
                    ${finalPrice.toFixed(2)}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-xl text-gray-400 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {discountPercentage}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-600">Price per {product.unit}</p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {isInStock ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-600 font-medium">
                      {isLowStock ? `Only ${product.stock} left in stock` : 'In Stock'}
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Product Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">SKU</span>
                  </div>
                  <span className="text-sm text-gray-600">{product.sku}</span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Brand</span>
                  </div>
                  <span className="text-sm text-gray-600">{product.brand}</span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Weight</span>
                  </div>
                  <span className="text-sm text-gray-600">{product.weight} {product.unit}</span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Category</span>
                  </div>
                  <span className="text-sm text-gray-600">{product.category}</span>
                </div>
              </div>

              {/* Tags */}
              {product.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

         
            </div>
          </div>
        </div>

        {/* Specifications */}
        {product.specifications.size > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...product.specifications.entries()].map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-700">{key}</span>
                  </div>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trust & Security */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Arkin Organics?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">100% Organic</h4>
              <p className="text-gray-600">Certified organic products with no harmful chemicals</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Quality Guaranteed</h4>
              <p className="text-gray-600">Rigorous testing and quality control processes</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <RefreshCw className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">30-Day Returns</h4>
              <p className="text-gray-600">Not satisfied? Return within 30 days for full refund</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}