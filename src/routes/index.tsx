import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constants/role";
import About from "@/pages/About";

import Homepage from "@/pages/Homepage";
import Login from "@/pages/Login";
import Product from "@/pages/Product";
import Register from "@/pages/Register";
import Order from "@/pages/User/Order";
import productDetails from "@/pages/User/productDetails";
import Verify from "@/pages/Verify";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItem";
import { userSidebarItems } from "./userSidebarItem";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
       {
        Component: Homepage,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Product,
        path: "product",
      },
      {
        Component: productDetails,
        path: "product/:id",
      },
      {
        Component: withAuth(Order),
        path: "order/:id",
      },
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Verify,
    path: "/verify",
  },
   {
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },


{
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/order" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },


  
]);
