import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Package, Filter, Grid3x3, List, ShoppingBag } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/features/Product/product.api";
import { Link, useSearchParams, useNavigate } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import type { IProduct } from "@/types/product.type";

// Mock categories - replace with actual categories from your API
const categories = [
  { id: "all", label: "All Products", count: 120 },
  { id: "VEGETABLE", label: "Vegetables", count: 45 },
  { id: "FRUIT", label: "Fruits", count: 32 },
  { id: "DAIRY", label: "Dairy", count: 18 },
  { id: "MEAT", label: "Meat & Fish", count: 25 },
  { id: "BAKERY", label: "Bakery", count: 15 },
  { id: "BEVERAGES", label: "Beverages", count: 20 },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const productType = searchParams.get("productType") || undefined;
  const categoryParam = searchParams.get("category") || "all";

  const {
    data: products = [],
    isLoading,
    isError,
  } = useGetAllProductsQuery({ productType });

  // Update selected category when URL param changes
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // Filter products based on selected category and search
  const filteredProducts = products.filter((product: IProduct) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const newParams = new URLSearchParams(searchParams);
    if (categoryId === "all") {
      newParams.delete("category");
    } else {
      newParams.set("category", categoryId);
    }
    setSearchParams(newParams);
  };

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 text-gray-800 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Unable to load products</h2>
          <p className="text-gray-800 mb-6">Please try again later.</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-green-600 text-white py-10 px-5">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Discover fresh produce, quality groceries, and everything you need
            for your kitchen
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 w-11/12">
        {/* Search and Filter Bar */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow-sm border text-black">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="flex-1">
              <div className="relative max-w-lg">
                <Input
                  type="search"
                  placeholder="Search products by name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">View:</span>
                <Button
                  variant={layout === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setLayout("grid")}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={layout === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setLayout("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <Tabs
            defaultValue="all"
            value={selectedCategory}
            onValueChange={handleCategoryClick}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Shop by Category</h2>
              <Badge variant="outline" className="text-sm">
                {filteredProducts.length} products found
              </Badge>
            </div>

            <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className={`px-4 py-2 rounded-full border data-[state=active]:bg-primary data-[state=active]:text-black   transition-all ${
                    selectedCategory === category.id
                      ? "bg-primary text-black"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  <span className="font-medium text-black">
                    {category.label}
                  </span>
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Products Grid/List */}
        {isLoading ? (
          <div
            className={
              layout === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
                : "space-y-4"
            }
          >
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden w-full h-56">
                <CardContent className="p-0">
                  <Skeleton className="h-32 w-full" />
                  <div className="p-2">
                    <Skeleton className="h-4 w-3/4 mb-1" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? `No products match "${searchQuery}"`
                : "No products available in this category"}
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                navigate("/products");
              }}
            >
              View All Products
            </Button>
          </div>
        ) : layout === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product: IProduct) => (
              <ProductCard key={product.id} product={product} view="grid" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product: IProduct) => (
              <ProductCard key={product.id} product={product} view="list" />
            ))}
          </div>
        )}

        {/* Pagination (if needed) */}
        {filteredProducts.length > 0 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-primary text-white"
              >
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Product Card Component - Simplified without cart
interface ProductCardProps {
  product: IProduct;
  view: "grid" | "list";
}

function ProductCard({ product, view }: ProductCardProps) {
  const safeProduct = {
    ...product,
    id: product.id || 0,
    name: product.name || "",
    description: product.description || "",
    price:
      typeof product.price === "string"
        ? parseFloat(product.price)
        : product.price || 0,
    image: product.image || "",
    category: product.category || "uncategorized",
    stock:
      typeof product.stock === "string"
        ? parseInt(product.stock)
        : product.stock || 0,
    discount:
      typeof product.discountPrice === "string"
        ? parseFloat(product.discountPrice)
        : product.discountPrice || 0,
    unit: product.unit || "pcs",
  };

  const originalPrice = Number(safeProduct.price);
  const discountPercentage = Number(safeProduct.discount) || 0;
  const discountedPrice =
    discountPercentage > 0
      ? originalPrice * (1 - discountPercentage / 100)
      : originalPrice;

  if (view === "list") {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border hover:border-primary/20">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 lg:w-1/5 relative">
            <div className="h-32 md:h-full">
              <img
                src={safeProduct.image}
                alt={safeProduct.name}
                className="object-cover w-full h-full rounded-2xl"
              />
              {discountPercentage > 0 && (
                <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
                  -{discountPercentage}% OFF
                </Badge>
              )}
            </div>
          </div>

          <div className="flex-1 p-3">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-sm font-semibold mb-1 text-white">
                  {safeProduct.name}
                </h3>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="capitalize text-xs">
                    {safeProduct.category}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="capitalize text-xs text-white"
                  >
                    {safeProduct.unit}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                {discountPercentage > 0 ? (
                  <>
                    <div className="text-sm font-bold text-primary">
                      ৳{discountedPrice.toLocaleString()}
                    </div>
                    <div className="text-xs text-white line-through">
                      ৳{originalPrice.toLocaleString()}
                    </div>
                  </>
                ) : (
                  <div className="text-sm font-bold text-white">
                    ৳{originalPrice.toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            <p className="text-xs text-white mb-2">{safeProduct.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-white">
                <Package className="h-3 w-3" />
                <span>
                  {safeProduct.stock} {safeProduct.unit}
                </span>
              </div>
              <div className="flex gap-2">
                <Button asChild className="gap-1 text-xs">
                  <Link to={`/product/${safeProduct.id}`}>
                    <Eye className="h-3 w-3" />
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Grid view
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 h-64 w-full flex flex-col border border-gray-200 rounded-2xl bg-white">
      {/* Image */}
      <div className="relative">
        <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 h-28">
          <img
            src={safeProduct.image}
            alt={safeProduct.name}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          />
        </div>

        {discountPercentage > 0 && (
          <Badge className="absolute top-1 left-1 bg-red-600 text-white text-xs font-medium px-1 py-0.5 rounded">
            -{discountPercentage}% OFF
          </Badge>
        )}

        <div className="absolute top-1 right-1 flex flex-col gap-1 items-end">
          <Badge
            variant="secondary"
            className="capitalize text-xs font-medium px-1 py-0.5 rounded bg-gray-800 text-white"
          >
            {safeProduct.category}
          </Badge>
          {safeProduct.isAvailable === false && (
            <Badge
              variant="destructive"
              className="text-xs font-medium px-1 py-0.5 rounded bg-red-600 text-white"
            >
              Out of Stock
            </Badge>
          )}
        </div>
      </div>

      {/* Name */}
      <CardHeader className="pb-0 pt-1 px-3 flex justify-between items-center">
        <CardTitle className="text-sm font-semibold text-black truncate">
          {safeProduct.name}
        </CardTitle>
        <div className=" gap-1 text-xs bg-green-200 text-black hover:bg-primary/90">
          <Link
            to={`/product/${safeProduct.id}`}
            className="flex items-center justify-center"
          >
            <Eye className="h-3 w-3" />
            View Product
          </Link>
        </div>
      </CardHeader>

      {/* Stock + Price */}
      <CardContent className="flex-1 px-3 pb-2 flex flex-col justify-start gap-1">
        <div className="flex items-center justify-between text-xs text-black">
          <div className="flex items-center gap-1">
            <Package className="h-3 w-3" />
            <span>
              {safeProduct.stock} {safeProduct.unit}
            </span>
          </div>
          {discountPercentage > 0 ? (
            <div className="text-right">
              <div className="text-sm font-bold text-black">
                ৳{discountedPrice.toLocaleString()}
              </div>
              <div className="text-xs text-black line-through">
                ৳{originalPrice.toLocaleString()}
              </div>
            </div>
          ) : (
            <div className="text-sm font-bold text-black">
              ৳{originalPrice.toLocaleString()}
            </div>
          )}
        </div>
      </CardContent>

      {/* Button */}
      <CardFooter className=""></CardFooter>
    </Card>
  );
}
