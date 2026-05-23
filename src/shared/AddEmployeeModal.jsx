import { X, Plus } from "lucide-react";
import {
  projectSelect,
  tableSearchDepartmentData,
} from "../DataList/DropdownData";
import MainButton from "./MainButton";
import CustomDropdown from "./CustomDropdown";

const AddEmployeeModal = ({ setIsModalOpen }) => {
  return (
    <div className="bg-white w-full max-w-5xl p-4 sm:p-6 md:p-8 rounded-2xl">
      <div className="flex items-start justify-between border-b border-gray-200 pb-5 mb-6">
        <div className="w-2/3 lg:w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Add Employee
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Add employee working information and schedule
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(false)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <X size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="w-2/3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employee ID
          </label>

          <input
            type="text"
            placeholder="#1250"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <br />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employee Name*
          </label>

          <input
            type="text"
            placeholder="Sadik Hasan"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <br />

        <div className="w-2/3">
          <label className="flex items-center  gap-2 text-sm font-medium text-gray-700 mb-2">
            Department*
          </label>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <CustomDropdown
                placeholder="Department"
                data={tableSearchDepartmentData}
              />
            </div>

            <button
              className="
                p-3
                rounded-xl
                border
                border-primary
                text-primary
                hover:bg-primary
                hover:text-white
                transition
                shrink-0
              "
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        <div className="w-2/3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            Project
          </label>

          <div className="flex items-center gap-3">
            <div className="flex-1">
              <CustomDropdown placeholder=" Project" data={projectSelect} />
            </div>

            <button
              className="
                p-3
                rounded-xl
                border
                border-primary
                text-primary
                hover:bg-primary
                hover:text-white
                transition
                shrink-0
              "
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        <div className="w-2/3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            Start Time*
          </label>

          <div className="flex items-center gap-3">
            <input
              type="time"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />

            <button
              className="p-3 rounded-xl border  border-primary
                text-primary  hover:bg-primary  hover:text-white
                transition  shrink-0"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        <div className="w-2/3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            End Time
          </label>

          <div className="flex items-center gap-3">
            <input
              type="time"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />

            <button
              className="p-3 rounded-xl border  border-primary
                text-primary hover:bg-primary hover:text-white
                transition shrink-0"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mt-8">
        <button
          onClick={() => setIsModalOpen(false)}
          className="w-full sm:w-auto px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <MainButton className="w-full sm:w-auto bg-primary text-white">
          Add Employee
        </MainButton>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
