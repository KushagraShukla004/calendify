/* eslint-disable no-unused-vars */
import { useState } from "react";
import { format, addMonths, subMonths, isSameDay } from "date-fns";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Calendar, Search, Sparkles } from "lucide-react";
import { CalendarPage } from "./components/CalendarPage";
import { EventDetails } from "./components/EventDetails";
import { DatePickerModal } from "./components/DatePickerModal";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { eventsData } from "./constants/calendar";

function CalendarAppContent() {
  const { theme } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [direction, setDirection] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateInput, setDateInput] = useState({
    month: "",
    day: "",
    year: "",
  });
  const [dateError, setDateError] = useState("");

  const getEventsForDate = (date) => {
    return eventsData.filter((event) => isSameDay(new Date(event.date), date));
  };

  const navigateMonth = (direction) => {
    setDirection(direction);
    if (direction > 0) {
      setCurrentDate(addMonths(currentDate, 1));
    } else {
      setCurrentDate(subMonths(currentDate, 1));
    }
  };

  const validateAndNavigateToDate = () => {
    const { month, day, year } = dateInput;

    if (!month || !day || !year) {
      setDateError("Please fill in all date fields");
      return;
    }

    const monthNum = Number.parseInt(month);
    const dayNum = Number.parseInt(day);
    const yearNum = Number.parseInt(year);

    if (isNaN(monthNum) || isNaN(dayNum) || isNaN(yearNum)) {
      setDateError("Please enter valid numbers");
      return;
    }

    if (monthNum < 1 || monthNum > 12) {
      setDateError("Please enter a valid month (1-12)");
      return;
    }

    if (dayNum < 1 || dayNum > 31) {
      setDateError("Please enter a valid day (1-31)");
      return;
    }

    if (yearNum < 1000 || yearNum > 9999) {
      setDateError("Please enter a valid year (1000-9999)");
      return;
    }

    const targetDate = new Date(yearNum, monthNum - 1, dayNum);
    setDateError("");
    setCurrentDate(targetDate);
    setSelectedDate(targetDate);
    setShowDatePicker(false);
    setDateInput({ month: "", day: "", year: "" });
  };

  const handleDateInputChange = (field, value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    let maxLength;
    switch (field) {
      case "month":
      case "day":
        maxLength = 2;
        break;
      case "year":
        maxLength = 4;
        break;
      default:
        maxLength = 4;
    }

    const limitedValue = numericValue.slice(0, maxLength);
    setDateInput((prev) => ({ ...prev, [field]: limitedValue }));
    setDateError("");
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${theme.colors.primary} p-4 relative overflow-hidden`}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-full opacity-20"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${theme.colors.secondary} rounded-2xl ${theme.colors.shadow} p-6 mb-6 border-2 ${theme.colors.border}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className={`w-12 h-12 ${theme.colors.accent} rounded-xl flex items-center justify-center`}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className={`text-3xl font-bold ${theme.colors.text}`}>Calendify</h1>
                <p className={`${theme.colors.textSecondary} mt-1`}>
                  Your magical calendar experience ✨
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ThemeSwitcher />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDatePicker(true)}
                className={`flex items-center gap-2 px-4 py-2 ${theme.colors.accent} text-white rounded-lg ${theme.colors.accentHover} transition-colors font-medium`}
              >
                <Search className="w-4 h-4" />
                Go to Date
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={goToToday}
                className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-md hover:bg-green-200 transition-colors flex items-center space-x-1"
              >
                <Calendar className="w-4 h-4" />
                <span>Today</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center items-center gap-6 mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigateMonth(-1)}
            className={`p-3 rounded-full ${theme.colors.accent} text-white ${theme.colors.shadow} hover:shadow-xl transition-all`}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.h2
            key={format(currentDate, "MMMM yyyy")}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`text-2xl font-bold ${theme.colors.text} min-w-[250px] text-center px-6 py-3 ${theme.colors.secondary} rounded-xl ${theme.colors.shadow}`}
          >
            {format(currentDate, "MMMM yyyy")}
          </motion.h2>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigateMonth(1)}
            className={`p-3 rounded-full ${theme.colors.accent} text-white ${theme.colors.shadow} hover:shadow-xl transition-all`}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait" custom={direction}>
              <CalendarPage
                key={format(currentDate, "MMMM yyyy")}
                currentDate={currentDate}
                getEventsForDate={getEventsForDate}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                direction={direction}
              />
            </AnimatePresence>
          </div>

          {/* Event Details Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${theme.colors.secondary} rounded-2xl ${theme.colors.shadow} p-6 sticky top-4 border-2 ${theme.colors.border}`}
            >
              {selectedDate ? (
                <EventDetails date={selectedDate} getEventsForDate={getEventsForDate} />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    className={`w-16 h-16 mx-auto mb-4 ${theme.colors.accent} rounded-full flex items-center justify-center`}
                  >
                    <Calendar className="w-8 h-8 text-white" />
                  </motion.div>
                  <p className={`${theme.colors.textSecondary} text-lg`}>Select a date</p>
                  <p className={`${theme.colors.textSecondary} text-sm mt-2`}>
                    to view events 📅
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Event Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`${theme.colors.secondary} rounded-2xl ${theme.colors.shadow} p-6 mt-6 border-2 ${theme.colors.border}`}
        >
          <h3
            className={`font-bold text-lg ${theme.colors.text} mb-4 flex items-center gap-2`}
          >
            <Sparkles className="w-5 h-5" />
            Event Types
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: "meeting", color: "bg-blue-500", label: "Meetings", icon: "👥" },
              { type: "deadline", color: "bg-red-500", label: "Deadlines", icon: "⏰" },
              {
                type: "presentation",
                color: "bg-green-500",
                label: "Presentations",
                icon: "📊",
              },
              { type: "workshop", color: "bg-pink-500", label: "Workshops", icon: "🛠️" },
            ].map((item, index) => (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all"
              >
                <div className={`w-4 h-4 rounded-full ${item.color} shadow-lg`} />
                <span className="text-lg">{item.icon}</span>
                <span className={`text-sm font-medium ${theme.colors.text}`}>
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Date Picker Modal */}
        <DatePickerModal
          isOpen={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          dateInput={dateInput}
          handleDateInputChange={handleDateInputChange}
          dateError={dateError}
          validateAndNavigateToDate={validateAndNavigateToDate}
        />
      </div>
    </div>
  );
}

export default function CalendarApp() {
  return (
    <ThemeProvider>
      <CalendarAppContent />
    </ThemeProvider>
  );
}
