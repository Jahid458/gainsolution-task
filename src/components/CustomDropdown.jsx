import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CustomDropdown = ({ options = [], placeholder, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);

    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleSelect = (value) => {
    setSelected(value);
    onSelect(value);
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full h-12 border border-[#DBDFE2] rounded-xl px-4 flex items-center justify-between text-sm bg-white"
      >
        <span>{selected || placeholder}</span>

        <ChevronDown
          size={16}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-14 left-0 w-full bg-white border border-[#E5E7EB] rounded-xl shadow-lg overflow-hidden z-50">
          {options.map((item, i) => (
            <button
              key={i}
              onClick={() => handleSelect(item)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
