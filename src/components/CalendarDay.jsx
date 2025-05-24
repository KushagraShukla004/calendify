/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { format, isSameMonth, isToday, isSameDay } from "date-fns";
import { EventCard } from "./EventCard";
import { useTheme } from "../contexts/ThemeContext";

export const CalendarDay = ({
  day,
  currentDate,
  selectedDate,
  getEventsForDate,
  onSelectDate,
}) => {
  const { theme } = useTheme();

  if (!day || !getEventsForDate || typeof getEventsForDate !== "function") {
    console.error("Required props missing in CalendarDay");
    return null;
  }

  const dayEvents = getEventsForDate(day);
  const isCurrentMonth = isSameMonth(day, currentDate);
  const isCurrentDay = isToday(day);
  const isSelected = selectedDate && isSameDay(day, selectedDate);
  const hasEvents = dayEvents.length > 0;

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        zIndex: 10,
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelectDate(day)}
      className={`
        min-h-[120px] p-3 border-2 cursor-pointer transition-all duration-300 relative
        ${isCurrentMonth ? theme.colors.calendar : "bg-gray-50 opacity-60"}
        ${
          isCurrentDay
            ? `border-4 border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-lg`
            : theme.colors.calendarBorder
        }
        ${
          isSelected
            ? `border-4 border-purple-500 bg-gradient-to-br from-purple-50 to-purple-100 shadow-lg`
            : ""
        }
        ${hasEvents ? "shadow-md" : ""}
        hover:shadow-xl hover:border-opacity-80
      `}
    >
      {/* Day number */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className={`
          text-lg font-bold mb-2 relative
          ${isCurrentMonth ? theme.colors.text : "text-gray-400"}
          ${isCurrentDay ? "text-yellow-600" : ""}
          ${isSelected ? "text-purple-600" : ""}
        `}
      >
        {format(day, "d")}

        {/* Special day indicators */}
        {isCurrentDay && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
          />
        )}

        {hasEvents && (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full"
          />
        )}
      </motion.div>

      {/* Events */}
      <div className="space-y-1">
        {dayEvents.slice(0, 3).map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <EventCard event={event} isSmall={dayEvents.length > 2} />
          </motion.div>
        ))}
        {dayEvents.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-gray-500 font-medium bg-gray-100 rounded px-2 py-1 text-center"
          >
            +{dayEvents.length - 3} more
          </motion.div>
        )}
      </div>

      {/* Hover effect overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-0 pointer-events-none rounded"
        whileHover={{ opacity: 0.1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};
