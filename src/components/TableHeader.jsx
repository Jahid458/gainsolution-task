import { useState } from "react";
import { Users, Download, UserPlus } from "lucide-react";
import AddEmployeeModal from "../shared/AddEmployeeModal";
import MainButton from "../shared/MainButton";

const TableHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl border bg-white  shadow-sm">
          <Users className="w-6 h-6 text-primary" />
        </div>

        <div className="">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Employee Time
          </h2>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Manage your time logs
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 xl:mt-0 mt-4 w-2/3 lg:w-fit ">
        <MainButton
          icon={<Download className="w-4 h-4" />}
          iconPosition="right"
          className="bg-white border border-gray-300 text-gray-800 hover:bg-gray-50"
        >
          Export Excel
        </MainButton>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition"
        >
          <UserPlus className="w-4 h-4" />
          Add Employee
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/40">
          <div className="bg-white shadow-xl rounded-lg max-w-[882px] w-full">
            <AddEmployeeModal setIsModalOpen={setIsModalOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TableHeader;
