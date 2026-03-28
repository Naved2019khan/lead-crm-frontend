import { NextRequest, NextResponse } from "next/server";

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  sku: string;
  brand: string;
  category: string;
  images: string[];
  stock: number;
  rating: number;
  reviewsCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// In-memory store (mock database)
let products: Product[] = [
  {
    _id: "69b697e2080eb405d75bfffc",
    name: "Nike Air Max 270",
    price: 129.99,
    description: "Comfortable running shoes with breathable mesh upper and foam cushioning for all-day wear.",
    sku: "NIKE-AMX-270",
    brand: "Nike",
    category: "65f1a7b8d92f4c1a23c9b111",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop",
    ],
    stock: 43,
    rating: 4.5,
    reviewsCount: 128,
    isActive: true,
    createdAt: "2026-03-15T11:28:34.784Z",
    updatedAt: "2026-03-15T15:56:39.567Z",
  },
  {
    _id: "69b697e2080eb405d75bfffd",
    name: "Adidas Ultra Boost 22",
    price: 189.99,
    description: "Premium running shoe with BOOST midsole technology for unmatched energy return.",
    sku: "ADIDAS-UB22-BLK",
    brand: "Adidas",
    category: "65f1a7b8d92f4c1a23c9b111",
    images: [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=300&fit=crop",
    ],
    stock: 17,
    rating: 4.8,
    reviewsCount: 342,
    isActive: true,
    createdAt: "2026-03-10T09:00:00.000Z",
    updatedAt: "2026-03-20T12:00:00.000Z",
  },
  {
    _id: "69b697e2080eb405d75bfffe",
    name: "Levi's 501 Original Jeans",
    price: 69.99,
    description: "Classic straight-leg jeans with a button fly. The original jean since 1873.",
    sku: "LEVIS-501-32X32",
    brand: "Levi's",
    category: "65f1a7b8d92f4c1a23c9b222",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=300&fit=crop",
    ],
    stock: 0,
    rating: 4.3,
    reviewsCount: 89,
    isActive: false,
    createdAt: "2026-02-28T08:00:00.000Z",
    updatedAt: "2026-03-25T10:00:00.000Z",
  },
  {
    _id: "69b697e2080eb405d75bffff",
    name: "Apple AirPods Pro (2nd Gen)",
    price: 249.00,
    description: "Active Noise Cancellation with Transparency mode. H2 chip, adaptive audio, personalized spatial audio.",
    sku: "APPLE-APP-2G-WHT",
    brand: "Apple",
    category: "65f1a7b8d92f4c1a23c9b333",
    images: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=300&fit=crop",
    ],
    stock: 8,
    rating: 4.9,
    reviewsCount: 512,
    isActive: true,
    createdAt: "2026-03-01T07:00:00.000Z",
    updatedAt: "2026-03-27T14:00:00.000Z",
  },
  {
    _id: "69b697e2080eb405d75c0000",
    name: "Sony WH-1000XM5",
    price: 349.99,
    description: "Industry-leading noise canceling headphones with 30-hour battery life and multipoint connection.",
    sku: "SONY-WH1000XM5-BLK",
    brand: "Sony",
    category: "65f1a7b8d92f4c1a23c9b333",
    images: [
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=300&fit=crop",
    ],
    stock: 24,
    rating: 4.7,
    reviewsCount: 203,
    isActive: true,
    createdAt: "2026-02-15T10:00:00.000Z",
    updatedAt: "2026-03-15T09:00:00.000Z",
  },
  {
    _id: "69b697e2080eb405d75c0001",
    name: "Samsung 65\" QLED 4K TV",
    price: 1299.00,
    description: "Quantum dot technology for vibrant colors. 120Hz refresh rate with Game Mode and Neo Smart TV.",
    sku: "SAMSUNG-QLED-65Q80",
    brand: "Samsung",
    category: "65f1a7b8d92f4c1a23c9b444",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f4834a?w=400&h=300&fit=crop",
    ],
    stock: 5,
    rating: 4.6,
    reviewsCount: 74,
    isActive: true,
    createdAt: "2026-03-05T11:00:00.000Z",
    updatedAt: "2026-03-28T08:00:00.000Z",
  },
];

// GET all products
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase() || "";
  const category = searchParams.get("category") || "";
  const isActive = searchParams.get("isActive");

  let filtered = [...products];

  if (search) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.brand.toLowerCase().includes(search) ||
        p.sku.toLowerCase().includes(search)
    );
  }

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (isActive !== null && isActive !== "") {
    filtered = filtered.filter((p) => p.isActive === (isActive === "true"));
  }

  return NextResponse.json({ success: true, data: filtered, total: filtered.length });
}

// POST create product
export async function POST(request: NextRequest) {
  const body = await request.json();
  const newProduct: Product = {
    _id: Math.random().toString(36).substring(2, 26),
    name: body.name,
    price: parseFloat(body.price),
    description: body.description,
    sku: body.sku,
    brand: body.brand,
    category: body.category || "65f1a7b8d92f4c1a23c9b111",
    images: body.images || [],
    stock: parseInt(body.stock) || 0,
    rating: 0,
    reviewsCount: 0,
    isActive: body.isActive ?? true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  products.push(newProduct);
  return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
}

// PATCH update product (stock or full edit)
export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { id, ...updates } = body;
  const idx = products.findIndex((p) => p._id === id);
  if (idx === -1) {
    return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
  }
  products[idx] = { ...products[idx], ...updates, updatedAt: new Date().toISOString() };
  return NextResponse.json({ success: true, data: products[idx] });
}

// DELETE product
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const idx = products.findIndex((p) => p._id === id);
  if (idx === -1) {
    return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
  }
  products.splice(idx, 1);
  return NextResponse.json({ success: true, message: "Product deleted" });
}
