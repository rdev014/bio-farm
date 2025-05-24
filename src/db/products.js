// data/products.js

const products = [
  {
    id: 1,
    title: "Fully Dry Cow Dung Fertilizer",
    slug: "fully-dry-cow-dung",
    category: "Fertilizers",
    description:
      "Naturally sun-dried cow dung ideal for all types of crops. 100% organic and chemical-free. Perfect for export and local sustainable farming.",
    images: ["1.jpg", "2.jpg", "3.jpg"], // stored in /public/products/fully-dry-cow-dung/
    price: 4.99,
    stock: 120,
    dryingStage: "Fully Dry",
    tags: ["organic", "cow dung", "fertilizer", "export"],
  },
  {
    id: 2,
    title: "Semi-Dry Cow Dung Fertilizer",
    slug: "semi-dry-cow-dung",
    category: "Fertilizers",
    description:
      "Balanced moisture cow dung suitable for mixing with compost or soil beds. Ideal for near-term usage.",
    images: ["1.jpg", "2.jpg"],
    price: 3.49,
    stock: 100,
    dryingStage: "Semi-Dry",
    tags: ["semi-dry", "organic", "natural farming"],
  },
  {
    id: 3,
    title: "Slightly Dry Cow Dung Fertilizer",
    slug: "slightly-dry-cow-dung",
    category: "Fertilizers",
    description:
      "Slightly dried and nutrient-rich cow dung ideal for immediate soil mixing and moisture-retaining crops.",
    images: ["1.jpg", "2.jpg"],
    price: 2.99,
    stock: 80,
    dryingStage: "Slightly Dry",
    tags: ["moist", "organic", "eco farming"],
  },
  {
    id: 4,
    title: "Neem-Based Organic Pest Repellent",
    slug: "neem-organic-repellent",
    category: "Pest Control",
    description:
      "Natural neem extract repellent to protect your crops from pests without harming soil quality or plant growth.",
    images: ["1.jpg", "2.jpg"],
    price: 6.99,
    stock: 60,
    dryingStage: null,
    tags: ["neem", "pesticide", "organic", "natural"],
  },
  {
    id: 5,
    title: "Vermicompost Enriched Soil Booster",
    slug: "vermicompost-soil-booster",
    category: "Compost",
    description:
      "Premium vermicompost for soil regeneration, rich in nutrients and microbial life to boost crop yields.",
    images: ["1.jpg", "2.jpg"],
    price: 5.99,
    stock: 75,
    dryingStage: null,
    tags: ["vermicompost", "compost", "soil health"],
  }
];

export default products;
