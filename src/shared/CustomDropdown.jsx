import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

const CustomDropdown = ({
  data = [],
  placeholder = "Select Option",
  setState,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSelect = (item) => {
    setSelected(item);
    setState && setState(item);
    setOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between rounded-xl border border-gray-300  bg-white px-4 py-3 text-sm text-gray-700
          transition  hover:border-gray-400
          focus:outline-none focus:ring-2
          focus:ring-primary/30">
        <span className={selected ? "text-gray-800" : "text-gray-400"}>
          {selected ? selected.name : placeholder}
        </span>

        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className=" absolute  left-0 top-full  z-50  mt-2
            w-full overflow-hidden rounded-xl border  border-gray-200
            bg-white shadow-lg animate-in fade-in zoom-in-95 "
        >
          {data?.map((item) => (
            <button key={item.id}
              onClick={() => handleSelect(item)}
              className="flex w-full items-center justify-between
                px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition">
              <span>{item.name}</span>

              {selected?.id === item.id && (
                <Check size={16} className="text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
