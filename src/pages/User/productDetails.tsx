/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Edit,
  ShoppingCart,
  Package,
  DollarSign,
  Tag,
  BarChart3,
  Calendar,
  Shield,
  Truck,
} from "lucide-react";
import { useGetProductQuery } from "@/redux/features/Product/product.api";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useCreateOrderMutation } from "@/redux/features/Order/order.api";
// import type { IProduct } from "@/types/product.type";



export default function ProductDetails() {

//   interface ApiResponse<T> {
//   statusCode: number;
//   success: boolean;
//   message: string;
//   data: T;
// }
// const productResponse = response.data as ApiResponse<IProduct>;'
// const product = productResponse.data;

// console.log(product.image); 
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: productResponse,
    isLoading,
    error,
  } = useGetProductQuery(id!, {
    skip: !id,
  });

  const product = productResponse?.data ;

  console.log(productResponse);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };



  const getStockStatus = (stock: number | string) => {
    const stockNumber = Number(stock);
    
    if (stockNumber <= 0)
      return { text: "Out of Stock", color: "destructive", icon: "❌" };
    if (stockNumber <= 10) return { text: "Low Stock", color: "warning", icon: "⚠️" };
    return { text: "In Stock", color: "success", icon: "✅" };
  };

  const getAvailability = (isAvailable: boolean | string) => {
    const isAvailableBool = typeof isAvailable === 'string' 
      ? isAvailable.toLowerCase() === 'true' || isAvailable === '1'
      : Boolean(isAvailable);
    
    return isAvailableBool
      ? { text: "Available", color: "bg-green-100 text-green-800" }
      : { text: "Unavailable", color: "bg-red-100 text-red-800" };
  };

 const [createOrder] = useCreateOrderMutation();

const handleAddToCart = async () => {
  if (!product) return;

  try {
    // Construct order data
    const orderData = {
      userId: 1, // replace with current logged-in user ID
      products: [
        { productId: Number(product.id),quantity: 5}, // quantity from state
      ],
      totalPrice: product.price,
      status: "PENDING" as const, // initial status
    };

    // Call the mutation
    const response = await createOrder(orderData).unwrap();

    toast.success(`${product.name} added to order successfully!`);

    console.log("Order created:", response);
    navigate("/user/order")
  } catch (err: any) {
    console.error("Failed to create order:", err);
    toast.error("Failed to add order");
  }
};


  const handleBuyNow = () => {
    toast.success(`Proceeding to checkout for ${product?.name}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Skeleton className="h-6 w-24 mb-4" />
          <Skeleton className="h-10 w-64" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Product Not Found</h2>
          <p className="mt-2 text-gray-600">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/products")} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  
  const stockStatus = getStockStatus(product.stock);
  const availability = getAvailability(product.isAvailable ||false);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Navigation */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/product")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">{product.category}</Badge>
              <Badge className={availability.color}>{availability.text}</Badge>
              <Badge>
                {stockStatus.icon} {stockStatus.text}
              </Badge>
            </div>
          </div>
          <Button
            onClick={() => navigate(`/product/update/${product.id}`)}
            variant="outline"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image & Actions */}
        <div className="space-y-6">
          {/* Product Image */}
          <Card>
            <CardContent className="p-6">
              {product.image ? (
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <Package className="h-16 w-16 mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-500">No image available</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={handleAddToCart} className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  variant="default"
                  className="w-full"
                >
                  Buy Now
                </Button>
              </div>
              
            </CardContent>
          </Card>
        </div>

    
        <div className="space-y-6">
         
          <Card>
            <CardHeader>
              <CardTitle>Pricing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">Regular Price</span>
                </div>
                <span className="text-2xl font-bold">
                  {product.price}
                </span>
              </div>

              
                
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="h-5 w-5 text-red-500" />
                      <span className="font-medium">Discount Price</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-red-600">
                        {product.discountPrice}
                      </span>
                      <div className="text-sm text-gray-500">
                        Save {formatPrice(Number(product.price) - Number(product.discountPrice))}
                      </div>
                    </div>
                  </div>
                
              

              <Separator />

              <div className="flex items-center justify-between">
                <span className="font-medium">You Save</span>
                <span className="text-lg font-semibold text-green-600">
                  {product.discountPrice
                    ? formatPrice(Number(product.price) - Number(product.discountPrice))
                    : formatPrice(0)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Stock & Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Stock Quantity</p>
                      <p className="font-semibold">
                        {product.stock} {product.unit}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Unit</p>
                      <p className="font-semibold">{product.unit}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <Badge className={availability.color}>
                        {availability.text}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="font-semibold">
                        {product.updatedAt
                          ? new Date(product.updatedAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

         
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-200 whitespace-pre-line">
                {product.description || "No description provided."}
              </p>
            </CardContent>
          </Card>

      
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <Truck className="h-6 w-6 text-blue-500" />
                  <div>
                    <p className="font-medium text-black">Free Shipping</p>
                    <p className="text-sm text-gray-500">On orders over $50</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <Shield className="h-6 w-6 text-green-500" />
                  <div>
                    <p className="font-medium text-black">Quality Guarantee</p>
                    <p className="text-sm text-gray-500">
                      30-day return policy
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}