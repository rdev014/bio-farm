  const recentOrders = [
    {
      id: 'ORD-2847',
      date: '2025-07-01',
      status: 'delivered',
      items: 3,
      total: '$2,450.00',
      products: ['Premium Organic Compost', 'Bio-Active Fertilizer', 'Soil Conditioner'],
      deliveryDate: '2025-07-03'
    },
    {
      id: 'ORD-2846',
      date: '2025-06-28',
      status: 'shipped',
      items: 2,
      total: '$1,875.00',
      products: ['Liquid Fertilizer', 'Growth Booster'],
      deliveryDate: '2025-07-05'
    },
    {
      id: 'ORD-2845',
      date: '2025-06-25',
      status: 'processing',
      items: 1,
      total: '$895.00',
      products: ['Organic Mulch'],
      deliveryDate: '2025-07-08'
    }
  ];


    const quickItems = [
    {
      id: 'P001',
      name: 'Premium Organic Compost',
      price: '$49.99',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop',
      lastOrdered: '2025-07-01',
      inStock: true
    },
    {
      id: 'P002',
      name: 'Bio-Active Liquid Fertilizer',
      price: '$39.99',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop',
      lastOrdered: '2025-06-28',
      inStock: true
    },
    {
      id: 'P003',
      name: 'Soil Conditioner Mix',
      price: '$32.99',
      image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=300&h=200&fit=crop',
      lastOrdered: '2025-06-15',
      inStock: false
    }
  ];


    const recommendations = [
    {
      id: 'R001',
      name: 'Advanced Root Stimulator',
      price: '$45.99',
      originalPrice: '$52.99',
      image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=300&h=200&fit=crop',
      rating: 4.8,
      reviews: 234,
      badge: 'New',
      savings: 13
    },
    {
      id: 'R002',
      name: 'Organic Pest Control',
      price: '$28.99',
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=300&h=200&fit=crop',
      rating: 4.9,
      reviews: 189,
      badge: 'Popular',
      savings: 0
    },
    {
      id: 'R003',
      name: 'Premium Seed Starter',
      price: '$35.99',
      originalPrice: '$41.99',
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=300&h=200&fit=crop',
      rating: 4.7,
      reviews: 156,
      badge: 'Sale',
      savings: 14
    }
  ];