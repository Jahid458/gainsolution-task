/* eslint-disable no-unused-vars */
import { Search, CalendarDays } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from "react";
import CustomDropdown from "./CustomDropdown";

const TableDropDown = ({ filters, setFilters }) => {
  const [dateRange, setDateRange] = useState([null, null]);

  const [startDate, endDate] = dateRange;

  return (
    <div className="flex xl:flex-row flex-col xl:items-center justify-between gap-4 mb-5">
      <h2 className="text-2xl font-semibold text-[#0A0A0A]">
        Employee Time Logs
      </h2>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-3">
        <div className="flex items-center gap-2 border border-[#DBDFE2] rounded-xl px-4 h-12">
          <Search size={18} className="text-gray-500" />

          <input
            type="text"
            placeholder="Search ID or Name"
            className="w-full outline-none text-sm"
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                search: e.target.value,
              }))
            }
          />
        </div>

        <div className="flex items-center gap-2 border border-[#DBDFE2] rounded-xl px-4 h-12 bg-white">
          <CalendarDays size={18} className="text-gray-500" />

          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
              setDateRange(update);
            }}
            placeholderText="Select Date Range"
            className="outline-none text-sm w-full"
          />
        </div>

        <CustomDropdown
          placeholder="Status"
          options={["Approved", "Rejected"]}
          onSelect={(value) =>
            setFilters((prev) => ({
              ...prev,
              status: value,
            }))
          }
        />

        <CustomDropdown
          placeholder="Department"
          options={["Design", "Development", "Product", "Sales"]}
          onSelect={(value) =>
            setFilters((prev) => ({
              ...prev,
              department: value,
            }))
          }
        />
      </div>
    </div>
  );
};

export default TableDropDown;
