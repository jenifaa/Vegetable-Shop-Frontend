/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/orders/OrderHistory.tsx
import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Loader2, Package, Calendar, DollarSign, Eye, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useGetOrdersQuery } from '@/redux/features/Order/order.api';

const Order: React.FC = () => {
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery(undefined);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy hh:mm a');
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading orders...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Card className="border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle className="h-6 w-6" />
              <div>
                <h3 className="font-semibold">Error loading orders</h3>
                <p className="text-sm text-red-500">Please try again</p>
              </div>
            </div>
            <Button onClick={() => refetch()} className="mt-4">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-4">Your order history will appear here</p>
            <Button onClick={() => window.location.href = '/'}>
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Order History</h1>
        <p className="text-gray-600">View all your past orders</p>
      </div>

      <div className="space-y-6">
        {orders.map((order:any) => (
          <Card key={order.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">
                    Order #{order.id?.slice(-8).toUpperCase() || 'N/A'}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {formatDate(order.createdAt || new Date().toISOString())}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={`px-3 py-1 ${getStatusColor(order.status)}`}>
                    {order.status || 'Pending'}
                  </Badge>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <span className="font-bold text-lg">
                        ${typeof order.total === 'number' ? order.total.toFixed(2) : '0.00'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{order.items?.length || 0} items</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Order Items */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Items Ordered</h4>
                <div className="space-y-3">
                  {order.items?.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                          <Package className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity} × ${item.price?.toFixed(2) || '0.00'}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">
                        ${((item.quantity || 0) * (item.price || 0)).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Order Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Shipping Address</h4>
                  {order.shipping ? (
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{order.shipping.name}</p>
                      <p>{order.shipping.address}</p>
                      <p>
                        {order.shipping.city}, {order.shipping.zipCode}
                      </p>
                      <p>Phone: {order.shipping.phone}</p>
                      <p>Email: {order.shipping.email}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No shipping information</p>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Order Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${order.subtotal?.toFixed(2) || '0.00'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${order.shippingCost?.toFixed(2) || '0.00'}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${order.total?.toFixed(2) || '0.00'}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Payment Method</span>
                      <span className="capitalize">{order.paymentMethod || 'Not specified'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile View for small screens */}
      <div className="md:hidden mt-6">
        <h3 className="text-lg font-semibold mb-4">Orders (Mobile View)</h3>
        <div className="space-y-4">
          {orders.map((order:any) => (
            <Card key={order.id}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">#{order.id?.slice(-8).toUpperCase()}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(order.createdAt || new Date().toISOString())}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Items: {order.items?.length || 0}</p>
                    <p className="text-lg font-bold">${order.total?.toFixed(2) || '0.00'}</p>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    View Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;