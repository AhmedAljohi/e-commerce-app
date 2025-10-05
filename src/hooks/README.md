# React Query Hooks

This directory contains custom React Query hooks for data fetching.

## Available Hooks

### `useProducts(limit?: number)`

Fetches all products from the Fakestore API.

**Parameters:**

- `limit` (optional): Number of products to fetch

**Returns:** `UseQueryResult<Product[], Error>`

**Example:**

```tsx
const { data: products, isLoading, error } = useProducts(10);
```

### `useProduct(id: string)`

Fetches a single product by ID.

**Parameters:**

- `id`: Product ID

**Returns:** `UseQueryResult<Product, Error>`

**Example:**

```tsx
const { data: product, isLoading } = useProduct('1');
```

### `useCategories()`

Fetches all product categories.

**Returns:** `UseQueryResult<string[], Error>`

**Example:**

```tsx
const { data: categories } = useCategories();
```

### `useProductsByCategory(category: string)`

Fetches products filtered by category.

**Parameters:**

- `category`: Category name

**Returns:** `UseQueryResult<Product[], Error>`

**Example:**

```tsx
const { data: products } = useProductsByCategory('electronics');
```

### `useSearchProducts(query: string)`

Searches products by title. Only triggers if query is longer than 2 characters.

**Parameters:**

- `query`: Search query

**Returns:** `UseQueryResult<Product[], Error>`

**Example:**

```tsx
const { data: results } = useSearchProducts('shirt');
```

## Caching Strategy

- **Products List**: Cached for 1 minute
- **Categories**: Cached for 5 minutes
- **Single Product**: Cached for 1 minute
- **Search Results**: Cached for 1 minute

All queries retry once on failure and don't refetch on window focus.
