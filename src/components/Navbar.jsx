import { useState } from "react";
import logo from "/logo.png";
import dp from "../assets/dp.png";
import {
  Search,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const navdata = [
    { title: "Home", link: "/" },
    { title: "Employee", link: "/employee" },
    { title: "Hiring", link: "/hire" },
    { title: "Report", link: "/report" },
    { title: "Files", link: "/file" },
    { title: "Payroll", link: "/payroll" },
  ];

  const userData = {
    name: "Sadik Hasan ",
    date: "Friday, 29 September",
    image: dp,
  };

  const [open, setOpen] = useState("");
  const [active, setActive] = useState("Employee");

  const toggle = (type) => {
    setOpen((prev) => (prev === type ? "" : type));
  };

  const closeAll = () => setOpen("");

  return (
    <nav className="relative w-full bg-white border-b border-gray-100 shadow-sm px-4 md:px-6 xl:px-8 py-3 z-50">
      <div className="max-w-400 mx-auto flex items-center justify-between">

        <div className="flex lg:w-[20%] justify-center items-center ">
          <h1 className="font-bold text-xl">PLUT</h1>
          <img src={logo} alt="logo" className="h-7" />
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {navdata.map((item) => (
            <a
              key={item.title}
              href={item.link}
              onClick={() => setActive(item.title)}
              className={`text-[16px] font-medium transition ${
                active === item.title
                  ? "text-primary border-primary pb-1"
                  : "text-[#5A5B5F] hover:text-primary"
              }`}
            >
              {item.title}
            </a>
          ))}
        </div>

        <div className="hidden xl:flex items-center gap-6">
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2 w-70">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full outline-none text-[15px]"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-semibold text-[15px]">{userData.name}</p>
              <p className="text-[13px] text-gray-500">{userData.date}</p>
            </div>
            <img
              src={userData.image}
              alt="profile"
        
            />
          </div>
        </div>

        <div className="flex xl:hidden items-center gap-4">

          <button onClick={() => toggle("search")}>
            <Search size={22} />
          </button>

          <button onClick={() => toggle("profile")}>
            <img
              src={userData.image}
              alt="profile"
              className="w-8 h-8 rounded-full border object-cover"
            />
          </button>

          <button onClick={() => toggle("menu")}>
            {open === "menu" ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </div>

      <div
        className={`xl:hidden absolute left-0 top-full w-full bg-white shadow-md transition-all duration-300 ${
          open === "search"
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <div className="p-4 border-t border-gray-100">
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none"
          />
        </div>
      </div>

      <div
        className={`lg:hidden absolute left-0 top-full w-full bg-white shadow-md transition-all duration-300 ${
          open === "menu"
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <div className="flex flex-col px-5 py-4">
          {navdata.map((item) => (
            <a
              key={item.title}
              href={item.link}
              onClick={closeAll}
              className="py-3 border-b border-gray-100 text-gray-600 hover:text-primary transition"
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>

      <div
        className={`xl:hidden absolute left-0 top-full w-full bg-white shadow-md transition-all duration-300 ${
          open === "profile"
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3 p-4">
          <img
            src={userData.image}
            className="h-12 w-12 rounded-full border border-[#CDCFD2] object-cover"
          />
          <div>
            <p className="font-semibold">{userData.name}</p>
            <p className="text-sm text-gray-500">{userData.date}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;