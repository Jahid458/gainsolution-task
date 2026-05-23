import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { months } from "../DataList/DropdownData";

const CalendarPopup = ({currentMonth,currentYear,setCurrentMonth,setCurrentYear,firstDay,
  daysInMonth,onSelect,onClose,todayDate,startDate,isEndCalendar}) => {
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  const startDateObj = startDate && new Date(
      startDate.split("/")[2],
      startDate.split("/")[1] - 1,
      startDate.split("/")[0]);

  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

  const handleSetDate = () => {
    if (selectedDay) {
      onSelect(selectedDay);
    }
    onClose();
  };

  return (
    <div className="absolute z-50 mt-2 bg-white shadow-xl rounded-2xl border border-[#E5E7EB] p-4 w-70">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() =>
            currentMonth === 0
              ? (setCurrentMonth(11), setCurrentYear(currentYear - 1))
              : setCurrentMonth(currentMonth - 1)
          }
          className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100"
        >
          <ChevronLeft size={16} className="text-[#606060]" />
        </button>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => {
                setShowMonthPicker(!showMonthPicker);
                setShowYearPicker(false);
              }}
              className="text-[#1E1E1E] text-sm font-medium flex items-center gap-1"
            >
              {months[currentMonth]?.name}
              <ChevronDown
                size={15}
                className={`transition-transform ${
                  showMonthPicker ? "rotate-180" : ""
                }`}
              />
            </button>

            {showMonthPicker && (
              <div className="absolute top-full left-0 mt-2 bg-white shadow-lg border border-[#E5E7EB] rounded-xl p-2 w-44 z-50 grid grid-cols-3 gap-1">
                {months.map((month, index) => (
                  <button
                    key={month.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentMonth(index);
                      setShowMonthPicker(false);
                    }}
                    className={`text-xs py-2 rounded-lg hover:bg-gray-100 ${
                      currentMonth === index
                        ? "bg-[#EEF2FF] text-primary"
                        : ""
                    }`}
                  >
                    {month.name.slice(0, 3)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowYearPicker(!showYearPicker);
                setShowMonthPicker(false);
              }}
              className="text-[#1E1E1E] text-sm font-medium flex items-center gap-1"
            >
              {currentYear}
              <ChevronDown
                size={15}
                className={`transition-transform ${
                  showYearPicker ? "rotate-180" : ""
                }`}
              />
            </button>

            {showYearPicker && (
              <div className="absolute top-full left-0 mt-2 bg-white shadow-lg border border-[#E5E7EB] rounded-xl p-2 w-24 max-h-48 overflow-y-auto z-50">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentYear(year);
                      setShowYearPicker(false);
                    }}
                    className={`w-full text-xs py-2 rounded-lg hover:bg-gray-100 ${
                      currentYear === year
                        ? "bg-[#EEF2FF] text-primary"
                        : ""
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() =>
            currentMonth === 11
              ? (setCurrentMonth(0), setCurrentYear(currentYear + 1))
              : setCurrentMonth(currentMonth + 1)
          }
          className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100"
        >
          <ChevronRight size={16} className="text-[#606060]" />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-[#98A2B3] text-xs mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center">
        {Array(firstDay)
          .fill(null)
          .map((_, i) => (
            <div key={i}></div>
          ))}

        {Array(daysInMonth)
          .fill(null)
          .map((_, i) => {
            const day = i + 1;

            const currentLoopDate = new Date(
              currentYear,
              currentMonth,
              day
            );

            const disableDay =
              isEndCalendar &&
              startDateObj &&
              currentLoopDate < startDateObj;

            const isSelected = selectedDay === day;

            const isToday =
              day === todayDate &&
              currentMonth === new Date().getMonth() &&
              currentYear === new Date().getFullYear();

            return (
              <button
                key={i}
                disabled={disableDay}
                onClick={() => !disableDay && handleDaySelect(day)}
                className={`w-8 h-8 mx-auto rounded-lg text-sm transition-all
                ${
                  disableDay
                    ? "text-gray-300 cursor-not-allowed"
                    : "hover:bg-primary/10"
                }
                ${
                  isSelected
                    ? "bg-primary text-white"
                    : isToday
                    ? "border border-primary text-primary"
                    : "text-[#344054]"
                }`}
              >
                {day}
              </button>
            );
          })}
      </div>

      <div className="flex items-center gap-3 mt-5">
        <button
          onClick={onClose}
          className="w-full h-10 rounded-xl border border-[#D0D5DD] text-sm text-[#344054]"
        >
          Cancel
        </button>

        <button
          onClick={handleSetDate}
          className="w-full h-10 rounded-xl bg-primary text-white text-sm"
        >
          Set Date
        </button>
      </div>
    </div>
  );
};

export default CalendarPopup;