// API Response Types for Fakestore API

export interface FakestoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface FakestoreCategory {
  id: string;
  name: string;
}

// Transform Fakestore product to our internal Product type
export function transformProduct(product: FakestoreProduct) {
  return {
    id: product.id.toString(),
    name: product.title,
    price: product.price,
    image: product.image,
    description: product.description,
    category: product.category,
    inStock: true,
    rating: product.rating.rate,
    discount: 0,
  };
}
