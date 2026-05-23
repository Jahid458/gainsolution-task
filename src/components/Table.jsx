import { useState } from "react";
import {
  MoreVertical,
  Check,
  X,
  Pencil,
  Trash2,
  Download,
} from "lucide-react";

import { TableData } from "../DataList/TableData";
import TableDropDown from "./TableDropDown";

const departmentColors = {
  Design: "bg-[#F0FDF4] text-[#16A34A]",
  Development: "bg-[#F0F6FD] text-[#1653A3]",
  Product: "bg-[#FDF3F0] text-[#A36616]",
  Sales: "bg-[#F9F0FD] text-[#8216A3]",
};

const Table = () => {
  const [tableData, setTableData] = useState(TableData);

  const [filters, setFilters] = useState({
    search: "",
    department: "",
    status: "",
  });

  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const [currentPage, setCurrentPage] = useState(4);

  const itemsPerPage = 5;

  const filteredData = tableData.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(filters.search.toLowerCase());

    const matchesDepartment = filters.department
      ? item.department === filters.department
      : true;

    const matchesStatus = filters.status
      ? item.status === filters.status.toLowerCase()
      : true;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const totalPages = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const updateStatus = (index, newStatus) => {
    setTableData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, status: newStatus } : item
      )
    );
  };

  const undoStatus = (index) => {
    setTableData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, status: "none" } : item
      )
    );
  };

  const deleteRow = (index) => {
    setTableData((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleMenu = (index) => {
    setOpenMenuIndex((prev) => (prev === index ? null : index));
  };

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    return [1, 2, 3, 4, "...", 8, 9, 10];
  };

  const renderActionButtons = (item, index) => {
    if (item.status === "approved") {
      return (
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 bg-[#E8F8EC] text-[#089624] border border-[#089624] px-3 py-1.5 rounded-xl text-xs">
            <Check size={14} />
            Approved
          </button>

          <button
            onClick={() => undoStatus(index)}
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
            onClick={() => undoStatus(index)}
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
          onClick={() => updateStatus(index, "rejected")}
          className="text-red-500 text-xs font-medium px-2 py-1 hover:bg-red-50 rounded"
        >
          Reject
        </button>

        <button
          onClick={() => updateStatus(index, "approved")}
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
        <TableDropDown
          filters={filters}
          setFilters={setFilters}
        />

        <div className="overflow-x-auto">
          <table className="w-full min-w-300 border-collapse">
            <thead>
              <tr className="bg-[#F4F6F8] text-[#464255] text-sm font-semibold">
                <th className="p-4 text-left rounded-l-xl">
                  Employee ID
                </th>

                <th className="p-4 text-left">
                  Employee
                </th>

                <th className="p-4 text-left">
                  Duration
                </th>

                <th className="p-4 text-left">
                  Time
                </th>

                <th className="p-4 text-left">
                  Due
                </th>

                <th className="p-4 text-left">
                  Department
                </th>

                <th className="p-4 text-left">
                  Project
                </th>

                <th className="p-4 text-left">
                  Notes
                </th>

                <th className="p-4 text-left rounded-r-xl w-55">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-[#ECEEF2] hover:bg-[#FAFAFA] text-sm text-[#464255]"
                >
                  <td className="p-4">
                    {item.id}
                  </td>

                  <td className="p-4 font-medium">
                    {item.name}
                  </td>

                  <td className="p-4">
                    {item.duration}
                  </td>

                  <td className="p-4">
                    {item.start} - {item.end}
                  </td>

                  <td className="p-4">
                    {item.due}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-2 ${
                        departmentColors[item.department]
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {item.department}
                    </span>
                  </td>

                  <td className="p-4">
                    {item.project}
                  </td>

                  <td className="p-4 max-w-55 truncate">
                    {item.notes}
                  </td>

                  <td className="p-4 relative">
                    <div className="flex items-center justify-end gap-3">
                      {renderActionButtons(
                        item,
                        startIndex + index
                      )}

                      <button
                        onClick={() =>
                          toggleMenu(startIndex + index)
                        }
                        className="p-2 border border-[#E5E7EB] rounded-lg hover:bg-gray-50"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>

                    {openMenuIndex ===
                      startIndex + index && (
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
                          onClick={() =>
                            deleteRow(startIndex + index)
                          }
                          className="flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-500 w-full text-sm"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 pb-10 mb-20 flex items-center justify-center md:justify-end gap-2 text-[#464255] font-medium flex-wrap ">
        <button
          onClick={() => changePage(currentPage - 1)}
          className="flex items-center gap-1 text-sm hover:text-black transition-all"
        >
          ← Previous
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() =>
              page !== "..." && changePage(page)
            }
            className={`w-8 h-8 rounded-lg text-sm border transition-all duration-200 ${
              currentPage === page
                ? "border-[#D0D5DD] bg-white shadow-sm text-black"
                : "border-transparent hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => changePage(currentPage + 1)}
          className="flex items-center gap-1 text-sm hover:text-black transition-all"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Table;