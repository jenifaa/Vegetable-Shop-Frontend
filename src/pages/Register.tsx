import TravelRegister from "@/assets/images/reg.jpg";
import { Link } from "react-router";
import Logo from "@/assets/icons/Logo2.png";
import { RegisterForm } from "@/components/modules/Authentication/RegisterForm";

export default function Register() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${TravelRegister})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/20 dark:bg-black/70"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-2xl rounded-2xl shadow-2xl px-8 py-3 border border-white/20">
          <div className="flex mb-5">
            <Link to="/" className="flex items-center justify-between gap-2">
              <img src={Logo} alt="Site Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                QuickMart
              </span>
            </Link>
          </div>

          <div className="">
            <RegisterForm />
          </div>

          
        </div>
      </div>
    </div>
  );
}