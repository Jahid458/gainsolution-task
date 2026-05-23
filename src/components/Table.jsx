import { useMemo, useState } from "react";
import { MoreVertical, Check, X, Pencil, Trash2, Download } from "lucide-react";
import { TableData } from "../DataList/TableData";
import TableDropDown from "./TableDropDown";

const colour = {
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

  const [openMenu, setOpenMenu] = useState(null);

  const filteredData = useMemo(() => {
    return tableData.filter((item) => {
      const searchMatch =
        item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.id.toLowerCase().includes(filters.search.toLowerCase());

      const departmentMatch = filters.department
        ? item.department === filters.department
        : true;

      const statusMatch = filters.status
        ? item.status === filters.status.toLowerCase()
        : true;

      return searchMatch && departmentMatch && statusMatch;
    });
  }, [tableData, filters]);

  const updateStatus = (id, status) => {
    setTableData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const deleteRow = (id) => {
    setTableData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-white border border-[#E4E7EC] rounded-2xl mt-10 p-4 md:p-6">
      <TableDropDown filters={filters} setFilters={setFilters} />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse">
          <thead>
            <tr className="bg-[#F4F6F8] text-[#464255] text-sm font-semibold">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-left">Duration</th>
              <th className="p-4 text-left">Time</th>
              <th className="p-4 text-left">Due</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Project</th>
              <th className="p-4 text-left">Notes</th>
              <th className="p-4 text-left w-[220px]">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr
                key={item.id}
                className="border-b border-[#ECEEF2] hover:bg-[#FAFAFA] text-sm text-[#464255]"
              >
                <td className="p-4">{item.id}</td>
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4">{item.duration}</td>
                <td className="p-4">
                  {item.start} - {item.end}
                </td>
                <td className="p-4">{item.due}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-2 ${
                      colour[item.department]
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {item.department}
                  </span>
                </td>

                <td className="p-4">{item.project}</td>

                <td className="p-4 max-w-55 truncate">
                  {item.notes}
                </td>

                <td className="p-4 relative">
                  <div className="flex items-center justify-end gap-3">

                    {item.status === "approved" ? (
                      <button className="flex items-center gap-1 bg-[#E8F8EC] text-[#089624] border border-[#089624] px-3 py-1.5 rounded-xl text-xs">
                        <Check size={14} />
                        Approved
                      </button>
                    ) : item.status === "rejected" ? (
                      <button className="flex items-center gap-1 bg-[#FFF1EF] text-[#E02600] border border-[#E02600] px-3 py-1.5 rounded-xl text-xs">
                        <X size={14} />
                        Rejected
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateStatus(item.id, "rejected")}
                          className="text-red-500 text-xs font-medium px-2 py-1 hover:bg-red-50 rounded"
                        >
                          Reject
                        </button>

                        <button
                          onClick={() => updateStatus(item.id, "approved")}
                          className="bg-[#089624] hover:bg-[#06751c] text-white px-3 py-1.5 rounded-xl text-xs"
                        >
                          Approve
                        </button>
                      </div>
                    )}

                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === item.id ? null : item.id)
                      }
                      className="p-2 border border-[#E5E7EB] rounded-lg hover:bg-gray-50"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  {openMenu === item.id && (
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
                        onClick={() => deleteRow(item.id)}
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
  );
};

export default Table;