import { useState } from "react";
import { MoreVertical, Check, X, Pencil, Trash2, Download } from "lucide-react";
import { TableData } from "../DataList/TableData";
import TableDropDown from "./TableDropDown";

const departmentColors = {
  Design: "bg-[#F0FDF4] text-[#16A34A]",
  Development: "bg-[#F0F6FD] text-[#1653A3]",
  Product: "bg-[#FDF3F0] text-[#A36616]",
  Sales: "bg-[#F9F0FD] text-[#8216A3]",
};

const parseDate = (str) => {
  if (!str) return null;
  const parts = str.split("/");
  if (parts.length !== 3) return null;
  const [dd, mm, yyyy] = parts;
  const d = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  d.setHours(0, 0, 0, 0);
  return d;
};

const FIXED_TOTAL_PAGES = 10;

const Table = () => {
  const [tableData, setTableData] = useState(TableData);
  const [filters, setFilters] = useState({
    search: "",
    department: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredData = tableData.filter((item) => {
    const searchTerm = filters.search.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm) ||
      item.id.toLowerCase().includes(searchTerm);

    const matchesDepartment = filters.department
      ? item.department === filters.department
      : true;

    const matchesStatus = filters.status
      ? item.status === filters.status.toLowerCase()
      : true;

    let matchesDate = true;
    if (filters.startDate && filters.endDate) {
      const itemDate = parseDate(item.date);
      const start = parseDate(filters.startDate);
      const end = parseDate(filters.endDate);
      if (itemDate && start && end) {
        matchesDate = itemDate >= start && itemDate <= end;
      }
    }

    return matchesSearch && matchesDepartment && matchesStatus && matchesDate;
  });

  const totalPages = FIXED_TOTAL_PAGES;
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const updateStatus = (globalIndex, newStatus) => {
    setTableData((prev) =>
      prev.map((item, i) => (i === globalIndex ? { ...item, status: newStatus } : item))
    );
  };

  const undoStatus = (globalIndex) => {
    setTableData((prev) =>
      prev.map((item, i) => (i === globalIndex ? { ...item, status: "none" } : item))
    );
  };

  const deleteRow = (globalIndex) => {
    setTableData((prev) => prev.filter((_, i) => i !== globalIndex));
  };

  const toggleMenu = (index) => {
    setOpenMenuIndex((prev) => (prev === index ? null : index));
  };

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    if (totalPages <= 8) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (safePage <= 4) {
      return [1, 2, 3, 4, "...", totalPages - 2, totalPages - 1, totalPages];
    }
    if (safePage >= totalPages - 2) {
      return [1, 2, 3, 4, "...", totalPages - 2, totalPages - 1, totalPages];
    }
    return [
      1, 2, 3, 4,
      "...",
      safePage - 1, safePage, safePage + 1,
      "...",
      totalPages - 2, totalPages - 1, totalPages,
    ];
  };

  const renderActionButtons = (item, globalIndex) => {
    if (item.status === "approved") {
      return (
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 bg-[#E8F8EC] text-[#089624] border border-[#089624] px-3 py-1.5 rounded-xl text-xs">
            <Check size={14} />
            Approved
          </button>
          <button
            onClick={() => undoStatus(globalIndex)}
            className="text-xs border border-[#D0D5DD] px-2 py-1 rounded-lg hover:bg-gray-50"
          >
            Undo
          </button>
        </div>
      );
    }
    if (item.status === "rejected") {
      return (
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 bg-[#FFF1EF] text-[#E02600] border border-[#E02600] px-3 py-1.5 rounded-xl text-xs">
            <X size={14} />
            Rejected
          </button>
          <button
            onClick={() => undoStatus(globalIndex)}
            className="text-xs border border-[#D0D5DD] px-2 py-1 rounded-lg hover:bg-gray-50"
          >
            Undo
          </button>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateStatus(globalIndex, "rejected")}
          className="text-red-500 text-xs font-medium px-2 py-1 hover:bg-red-50 rounded"
        >
          Reject
        </button>
        <button
          onClick={() => updateStatus(globalIndex, "approved")}
          className="bg-[#089624] hover:bg-[#06751c] text-white px-3 py-1.5 rounded-xl text-xs"
        >
          Approve
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="bg-white border border-[#E4E7EC] rounded-2xl mt-10 p-4 md:p-6">
        <TableDropDown filters={filters} setFilters={setFilters} />

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="bg-[#F4F6F8] text-[#464255] text-sm font-semibold">
                <th className="p-4 text-left rounded-l-xl">Employee ID</th>
                <th className="p-4 text-left">Employee</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Duration</th>
                <th className="p-4 text-left">Time</th>
                <th className="p-4 text-left">Due</th>
                <th className="p-4 text-left">Department</th>
                <th className="p-4 text-left">Project</th>
                <th className="p-4 text-left">Notes</th>
                <th className="p-4 text-left rounded-r-xl w-55">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center text-[#A4A4A4] text-sm">
                    No records found for the selected filters.
                  </td>
                </tr>
              ) : (
                currentData.map((item, index) => {
                  const globalIndex = tableData.indexOf(item);
                  return (
                    <tr
                      key={index}
                      className="border-b border-[#ECEEF2] hover:bg-[#FAFAFA] text-sm text-[#464255]"
                    >
                      <td className="p-4">{item.id}</td>
                      <td className="p-4 font-medium">{item.name}</td>
                      <td className="p-4 text-[#606060]">{item.date}</td>
                      <td className="p-4">{item.duration}</td>
                      <td className="p-4">{item.start} - {item.end}</td>
                      <td className="p-4">{item.due}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-2 ${departmentColors[item.department] || "bg-gray-100 text-gray-600"}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {item.department}
                        </span>
                      </td>
                      <td className="p-4">{item.project}</td>
                      <td className="p-4 max-w-[200px] truncate">{item.notes}</td>
                      <td className="p-4 relative">
                        <div className="flex items-center justify-end gap-3">
                          {renderActionButtons(item, globalIndex)}
                          <button
                            onClick={() => toggleMenu(globalIndex)}
                            className="p-2 border border-[#E5E7EB] rounded-lg hover:bg-gray-50"
                          >
                            <MoreVertical size={16} />
                          </button>
                        </div>
                        {openMenuIndex === globalIndex && (
                          <div className="absolute right-0 top-10 w-44 bg-white border border-[#E5E7EB] rounded-xl shadow-lg z-50 overflow-hidden">
                            <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full text-sm">
                              <Pencil size={14} />
                              Edit
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full text-sm">
                              <Download size={14} />
                              Export
                            </button>
                            <button
                              onClick={() => deleteRow(globalIndex)}
                              className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-500 w-full text-sm"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 pb-10 mb-20 flex items-center justify-center md:justify-end gap-2 text-[#464255] font-medium flex-wrap">
        <button
          onClick={() => changePage(safePage - 1)}
          disabled={safePage === 1}
          className="flex items-center gap-1 text-sm hover:text-black transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => page !== "..." && changePage(page)}
            className={`w-8 h-8 rounded-lg text-sm border transition-all duration-200 ${
              safePage === page
                ? "border-[#D0D5DD] bg-white shadow-sm text-black"
                : page === "..."
                ? "border-transparent cursor-default"
                : "border-transparent hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => changePage(safePage + 1)}
          disabled={safePage === totalPages}
          className="flex items-center gap-1 text-sm hover:text-black transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Table;