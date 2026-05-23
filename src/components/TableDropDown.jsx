import { Search, CalendarDays, X } from "lucide-react";
import { useState } from "react";
import CustomDropdown from "./CustomDropdown";
import DateRangeModal from "./DateRangeModal";

const TableDropDown = ({  setFilters }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appliedRange, setAppliedRange] = useState({ startDate: "", endDate: "" });

  const handleApply = ({ startDate, endDate }) => {
    setAppliedRange({ startDate, endDate });
    setFilters((prev) => ({ ...prev, startDate, endDate }));
    setIsModalOpen(false);
  };

  const handleClearDate = (e) => {
    e.stopPropagation();
    setAppliedRange({ startDate: "", endDate: "" });
    setFilters((prev) => ({ ...prev, startDate: "", endDate: "" }));
  };

  const displayLabel =
    appliedRange.startDate && appliedRange.endDate
      ? `${appliedRange.startDate} – ${appliedRange.endDate}`
      : "Select Date Range";

  return (
    <div className="flex xl:flex-row flex-col xl:items-center justify-between gap-4 mb-5">
      <h2 className="text-2xl font-semibold text-[#0A0A0A]">Employee Time Logs</h2>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-3">
        <div className="flex items-center gap-2 border border-[#DBDFE2] rounded-xl px-4 h-12">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search ID or Name"
            className="w-full outline-none text-sm"
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
          />
        </div>

        <div
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 border border-[#DBDFE2] rounded-xl px-4 h-12 bg-white cursor-pointer select-none"
        >
          <CalendarDays size={18} className="text-gray-500 shrink-0" />
          <span
            className={`text-sm truncate flex-1 ${
              appliedRange.startDate ? "text-[#0A0A0A]" : "text-gray-400"
            }`}
          >
            {displayLabel}
          </span>
          {appliedRange.startDate && (
            <button
              onClick={handleClearDate}
              className="shrink-0 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <CustomDropdown
          placeholder="Status"
          options={["Approved", "Rejected"]}
          onSelect={(value) =>
            setFilters((prev) => ({ ...prev, status: value }))
          }
        />

        <CustomDropdown
          placeholder="Department"
          options={["Design", "Development", "Product", "Sales"]}
          onSelect={(value) =>
            setFilters((prev) => ({ ...prev, department: value }))
          }
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center -mt-70 justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-170 mx-4">
            <DateRangeModal
              setIsModalOpen={setIsModalOpen}
              onApply={handleApply}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TableDropDown;