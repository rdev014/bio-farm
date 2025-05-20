'use client'
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const categories = [
  'All',
  'Vegetables',
  'Fruits',
  'Herbs',
  'Dairy',
  'Eggs',
  'Meat',
  'Honey'
];

export default function ProductsFilter({
  selectedCategory,
  organic,
  seasonal,
}: {
  selectedCategory?: string;
  organic?: boolean;
  seasonal?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFilters = (key: string, value: string | boolean) => {
    setIsSubmitting(true);
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === false || value === 'All') {
      params.delete(key);
    } else {
      params.set(key, value.toString());
    }
    
    params.delete('page'); // Reset to first page on filter change
    router.push(`/products?${params.toString()}`);
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="w-48">
        <Select
          value={selectedCategory || 'All'}
          onValueChange={(value) => updateFilters('category', value)}
          disabled={isSubmitting}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="organic"
          checked={organic}
          onCheckedChange={(checked) => updateFilters('organic', checked)}
          disabled={isSubmitting}
        />
        <Label htmlFor="organic">Organic Only</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="seasonal"
          checked={seasonal}
          onCheckedChange={(checked) => updateFilters('seasonal', checked)}
          disabled={isSubmitting}
        />
        <Label htmlFor="seasonal">Seasonal Products</Label>
      </div>
    </div>
  );
}
