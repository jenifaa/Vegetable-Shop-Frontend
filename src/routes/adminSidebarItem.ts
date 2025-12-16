
import AddProduct from "@/pages/Admin/AddProduct";
import AddProductType from "@/pages/Admin/AddProductType";
import UpdateProduct from "@/pages/Admin/UpdateProduct";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Product Management",
    items: [
      {
        title: "Add Product Type",
        url: "/admin/addProductType",
        component: AddProductType,
      },
    
      {
        title: "Add Product",
        url: "/admin/addProduct",
        component: AddProduct,
      },
      {
        title: "Update Product",
        url: "/admin/product/update/:id",
        component: UpdateProduct,
      },
    ],
  },
];