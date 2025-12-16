
import Order from "@/pages/User/Order";
import type { ISidebarItem } from "@/types";


export const userSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    items: [
      {
        title: "Order",
        url: "/user/order",
        component: Order,
      },
    ],
  },
];