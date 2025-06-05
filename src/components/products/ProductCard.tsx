import Image from 'next/image';
import Link from 'next/link';
import { IProduct } from '@/models/ProductSchema';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <Card className="group overflow-hidden rounded-xl transition-all hover:shadow-lg">
      <Link href={`/products/${product.slug}`} className="relative block aspect-square">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
        />
        {product.organic && (
          <Badge variant="success" className="absolute right-2 top-2">
            Organic
          </Badge>
        )}
        {product.seasonal && !product.seasonal && (
          <Badge variant="warning" className="absolute left-2 top-2">
            Out of Season
          </Badge>
        )}
      </Link>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-medium text-gray-900">{product.name}</h3>
          <div className="text-sm">
            {product.comparePrice && product.comparePrice > product.price ? (
              <div className="flex items-center gap-1">
                <span className="text-red-600">${product.price}</span>
                <span className="text-sm text-gray-500 line-through">
                  ${product.comparePrice}
                </span>
              </div>
            ) : (
              <span className="text-gray-900">${product.price}</span>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-500">
            {product.farm.name}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-4 w-4 ${
                i < product.rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>
      </CardFooter>
    </Card>
  );
}
