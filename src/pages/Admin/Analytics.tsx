import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Package, 
  BarChart3,
  Calendar,
  Download,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Analytics = () => {
  // Mock data - replace with real data from your API
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      title: "Total Orders",
      value: "2,356",
      change: "+12.3%",
      trend: "up",
      icon: <ShoppingCart className="h-4 w-4" />,
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+5.2%",
      trend: "up",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Products Sold",
      value: "4,589",
      change: "-2.1%",
      trend: "down",
      icon: <Package className="h-4 w-4" />,
    },
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", date: "2024-01-15", amount: "$245.99", status: "delivered" },
    { id: "ORD-002", customer: "Jane Smith", date: "2024-01-15", amount: "$189.50", status: "processing" },
    { id: "ORD-003", customer: "Bob Johnson", date: "2024-01-14", amount: "$345.75", status: "delivered" },
    { id: "ORD-004", customer: "Alice Brown", date: "2024-01-14", amount: "$89.99", status: "cancelled" },
    { id: "ORD-005", customer: "Charlie Wilson", date: "2024-01-13", amount: "$567.25", status: "delivered" },
  ];

  const topProducts = [
    { name: "Organic Tomatoes", sales: 456, revenue: "$2,345", growth: "+12%" },
    { name: "Fresh Basil", sales: 389, revenue: "$1,890", growth: "+8%" },
    { name: "Bell Peppers", sales: 321, revenue: "$1,567", growth: "+15%" },
    { name: "Cilantro", sales: 278, revenue: "$1,345", growth: "+5%" },
    { name: "Spinach", sales: 245, revenue: "$1,123", growth: "+3%" },
  ];

  const categoryDistribution = [
    { name: "Fresh Vegetables", value: 35, color: "bg-green-500" },
    { name: "Spices", value: 25, color: "bg-amber-500" },
    { name: "Organic Fruits", value: 20, color: "bg-emerald-500" },
    { name: "Dairy Products", value: 15, color: "bg-blue-500" },
    { name: "Others", value: 5, color: "bg-gray-500" },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case "delivered": return "bg-green-100 text-green-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-500">Monitor your store's performance and key metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                      {stat.change} from last month
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-gray-100">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Revenue Overview</CardTitle>
            <Tabs defaultValue="revenue" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Revenue chart would appear here</p>
                <p className="text-sm text-gray-400">Integrate with Chart.js, Recharts, or similar library</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.amount}</p>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Top Products</CardTitle>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-green-700">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{product.revenue}</p>
                    <p className="text-sm text-green-500">{product.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryDistribution.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm text-gray-500">{category.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${category.color} h-2 rounded-full`}
                      style={{ width: `${category.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-sm text-gray-500">Avg. Rating</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-2xl font-bold">98%</p>
                <p className="text-sm text-gray-500">Satisfaction</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-2xl font-bold">45</p>
                <p className="text-sm text-gray-500">New Customers</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <p className="text-2xl font-bold">2.4m</p>
                <p className="text-sm text-gray-500">Page Views</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Analytics;