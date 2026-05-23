import { useEffect, useRef, useState } from "react";
import { X, Calendar, ChevronDown } from "lucide-react";
import CalendarPopup from "./CalendarPopup";
import { dateRanges } from "../DataList/DropdownData";

const formatDate = (date) => {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const getPresetDates = (rangeName) => {
  const today = new Date();

  switch (rangeName) {
    case "Today":
      return {
        startDate: formatDate(today),
        endDate: formatDate(today),
      };

    case "Yesterday": {
      const y = new Date();
      y.setDate(today.getDate() - 1);

      return {
        startDate: formatDate(y),
        endDate: formatDate(y),
      };
    }

    case "Last 7 Days": {
      const s = new Date();
      s.setDate(today.getDate() - 6);

      return {
        startDate: formatDate(s),
        endDate: formatDate(today),
      };
    }

    case "Last 30 Days": {
      const s = new Date();
      s.setDate(today.getDate() - 29);

      return {
        startDate: formatDate(s),
        endDate: formatDate(today),
      };
    }

    case "This Month": {
      const s = new Date(today.getFullYear(), today.getMonth(), 1);

      const e = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      );

      return {
        startDate: formatDate(s),
        endDate: formatDate(e),
      };
    }

    case "Last Month": {
      const s = new Date(today.getFullYear(), today.getMonth() - 1, 1);

      const e = new Date(today.getFullYear(), today.getMonth(), 0);

      return {
        startDate: formatDate(s),
        endDate: formatDate(e),
      };
    }

    case "Custom Range":
      return {
        startDate: "",
        endDate: "",
      };

    default:
      return null;
  }
};

const DateRangeModal = ({ setIsModalOpen, onApply }) => {
  const today = new Date();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [showStartCal, setShowStartCal] = useState(false);
  const [showEndCal, setShowEndCal] = useState(false);

  const [selectedRange, setSelectedRange] = useState("Last 7 Days");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const calendarRef = useRef(null);
  const dropdownRef = useRef(null);

  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  const firstDay = new Date(
    currentYear,
    currentMonth,
    1
  ).getDay();

  useEffect(() => {
    const preset = getPresetDates("Last 7 Days");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStartDate(preset.startDate);
    setEndDate(preset.endDate);
  }, []);

  const handleRangeSelect = (name) => {
    setSelectedRange(name);

    const preset = getPresetDates(name);

    if (!preset) return;

    setStartDate(preset.startDate);
    setEndDate(preset.endDate);

    if (name !== "Custom Range") {
      setDropdownOpen(false);
    }
  };

  const handleDateSelect = (date, type) => {
    const formatted = `${String(date).padStart(
      2,
      "0"
    )}/${String(currentMonth + 1).padStart(
      2,
      "0"
    )}/${currentYear}`;

    if (type === "start") {
      setStartDate(formatted);
      setSelectedRange("Custom Range");
    } else {
      setEndDate(formatted);
      setSelectedRange("Custom Range");
    }
  };

  const handleApply = () => {
    onApply({
      startDate,
      endDate,
    });
  };

  useEffect(() => {
    const handleOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }

      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target)
      ) {
        setShowStartCal(false);
        setShowEndCal(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleOutside
      );
  }, []);

  return (
    <div className="relative px-6 pt-8 pb-6">
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute right-5 top-5 text-[#667085]"
      >
        <X size={18} />
      </button>

      <div className="flex  gap-5">
        <div className="w-30" ref={dropdownRef}>
          <label className="text-sm font-medium text-[#344054] mb-2 block">
            Date Range
          </label>

          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full h-11 border border-[#D0D5DD] rounded-xl px-4 flex items-center justify-between text-sm"
          >
            <span>{selectedRange}</span>

            <ChevronDown
              size={16}
              className={`transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute top-7.5 left-0 w-45 border border-[#E5E7EB] rounded-xl bg-white shadow-lg z-50 overflow-hidden">
              {dateRanges.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleRangeSelect(item.name)}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 ${
                    selectedRange === item.name
                      ? "bg-[#EEF2FF] text-primary"
                      : ""
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <div className="relative" ref={calendarRef}>
            <label className="text-sm font-medium text-[#344054] mb-2 block">
              Start date
            </label>

            <div
              onClick={() => {
                setShowStartCal(true);
                setShowEndCal(false);
              }}
              className="w-[140px] h-11 border border-[#D0D5DD] rounded-xl px-4 flex items-center justify-between cursor-pointer"
            >
              <span className="text-sm">
                {startDate || "dd/mm/yyyy"}
              </span>

              <Calendar size={16} className="text-[#98A2B3]" />
            </div>

            {showStartCal && (
              <CalendarPopup
                currentMonth={currentMonth}
                currentYear={currentYear}
                setCurrentMonth={setCurrentMonth}
                setCurrentYear={setCurrentYear}
                firstDay={firstDay}
                daysInMonth={daysInMonth}
                onSelect={(d) => handleDateSelect(d, "start")}
                onClose={() => setShowStartCal(false)}
                todayDate={today.getDate()}
                startDate={null}
                isEndCalendar={false}
              />
            )}
          </div>

          <div className="relative" ref={calendarRef}>
            <label className="text-sm font-medium text-[#344054] mb-2 block">
              End date
            </label>

            <div
              onClick={() => {
                setShowEndCal(true);
                setShowStartCal(false);
              }}
              className="w-[170px] h-11 border border-[#D0D5DD] rounded-xl px-4 flex items-center justify-between cursor-pointer"
            >
              <span className="text-sm">
                {endDate || "dd/mm/yyyy"}
              </span>

              <Calendar size={16} className="text-[#98A2B3]" />
            </div>

            {showEndCal && (
              <CalendarPopup
                currentMonth={currentMonth}
                currentYear={currentYear}
                setCurrentMonth={setCurrentMonth}
                setCurrentYear={setCurrentYear}
                firstDay={firstDay}
                daysInMonth={daysInMonth}
                onSelect={(d) => handleDateSelect(d, "end")}
                onClose={() => setShowEndCal(false)}
                todayDate={today.getDate()}
                startDate={startDate}
                isEndCalendar={true}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-5 h-10 border border-[#D0D5DD] rounded-xl text-sm"
        >
          Cancel
        </button>

        <button
          onClick={handleApply}
          className="px-6 h-10 rounded-xl bg-primary text-white text-sm"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default DateRangeModal;