import { useState } from "react";
import logo from "/NextLevel/shop/shop-frontend/src/assets/icons/Logo2.png";
import { Link } from "react-router";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth.api";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hook";
import { role } from "@/constants/role";

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/product", label: "Products", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.admin },
  // { href: "/admin", label: "Dashboard", role: role.superAdmin },
  // { href: "/user", label: "Dashboard", role: role.user },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white py-2 px-4 text-center text-sm">
        <p>Special Offer! Rewarding all customers with a 30% discount</p>
      </div>

      <div className="bg-gray-800 text-white py-2 px-6 text-sm">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <span>Language ~</span>
            <span>Currency ~</span>
          </div>
          <div className="flex space-x-4 items-center">
            <a href="#" className="hover:text-green-400">
              Track Your Order
            </a>
            <a href="#" className="hover:text-green-400">
              Newskiller
            </a>
            <a href="#" className="hover:text-green-400">
              Facts
            </a>
            {data?.data?.email && (
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            )}

            {!data?.data?.email && (
              <Link
                to="/login"
                className="hover:text-green-400 font-semibold  border-b-4 rounded-md px-4 py-1 bg-green-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      <nav className="bg-white shadow-md py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-green-600 flex items-center">
            <img className="w-10 h-10" src={logo} alt="" />
            <p> QuickMart</p>
          </div>

          <div className="hidden md:flex space-x-8">
            {navigationLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Your Product"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="absolute right-3 top-2 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {isDropdownOpen && (
          <div className="md:hidden mt-4 space-y-2">
            {navigationLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="block text-gray-700 hover:text-green-600 py-2"
                onClick={() => setIsDropdownOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <div className="bg-white py-6 px-6 border-b">
        <div className="flex items-center space-x-4 overflow-x-auto">
          <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700">
            <option>ALL CATEGORIES</option>
            <option>Fresh Vegetables</option>
            <option>Milk & Ice Creams</option>
            <option>Organic & Healthy Vegan Food</option>
            <option>Fresh Juice</option>
            <option>Ocean Foods</option>
            <option>Seeds & Spices</option>
            <option>Sandwich</option>
            <option>Canned Food</option>
            <option>Wraps & Rolls</option>
          </select>

          <div className="flex space-x-2 flex-nowrap">
            {[
              "Fresh Vegetables",
              "Milk & Ice Creams",
              "Organic & Healthy Vegan Food",
              "Fresh Juice",
              "Ocean Foods",
              "Seeds & Spices",
              "Sandwich",
              "Canned Food",
              "Wraps & Rolls",
            ].map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap hover:bg-green-100 hover:text-green-700 cursor-pointer"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section
        className="relative w-full h-[550px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/kVpb8ms2/banner.jpg')",
        }}
      >
        <div className="px-10 lg:px-24">
          <div className="max-w-lg">
            <h2 className="text-4xl lg:text-5xl font-extrabold  leading-snug">
              Organic & Healthy <br /> Vegan Food
            </h2>

            <p className="mt-4 ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <button className="mt-6 bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition">
              Purchase
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
