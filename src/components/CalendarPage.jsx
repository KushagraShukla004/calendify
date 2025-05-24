/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import {
  format,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import { CalendarDay } from "./CalendarDay";
import { SpiralBinding } from "./SpiralBinding";
import { useTheme } from "../contexts/ThemeContext";
import { weekDays } from "../constants/calendar";

export const CalendarPage = ({
  currentDate,
  getEventsForDate,
  selectedDate,
  onSelectDate,
  direction,
  isFlipping,
}) => {
  const { theme } = useTheme();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const pageVariants = {
    enter: (direction) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      rotateY: direction < 0 ? 90 : -90,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <motion.div
      custom={direction}
      variants={pageVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        duration: 0.6,
        ease: "easeInOut",
      }}
      className="relative"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <div
        className={`relative ${theme.colors.calendar} rounded-2xl ${theme.colors.shadow} overflow-hidden border-4 ${theme.colors.calendarBorder}`}
      >
        {/* Spiral Binding */}
        <SpiralBinding />

        {/* Calendar Content */}
        <div className="ml-12 relative">
          {/* Month Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`p-6 border-b-2 ${theme.colors.calendarBorder} bg-gradient-to-r ${theme.colors.primary}`}
          >
            <motion.h2
              key={format(currentDate, "MMMM yyyy")}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className={`text-3xl font-bold ${theme.colors.text} text-center tracking-wide`}
            >
              {format(currentDate, "MMMM yyyy")}
            </motion.h2>
          </motion.div>

          {/* Week Days Header */}
          <div
            className={`grid grid-cols-7 bg-gradient-to-r ${theme.colors.primary} border-b-2 ${theme.colors.calendarBorder}`}
          >
            {weekDays.map((day, index) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`p-4 text-center font-bold ${theme.colors.text} text-lg`}
              >
                {day}
              </motion.div>
            ))}
          </div>

          {/* Calendar Days Grid */}
          <div className="grid grid-cols-7 gap-0">
            {calendarDays.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.02 * index,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <CalendarDay
                  day={day}
                  currentDate={currentDate}
                  selectedDate={selectedDate}
                  getEventsForDate={getEventsForDate}
                  onSelectDate={onSelectDate}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full shadow-lg opacity-80" />
        <div className="absolute bottom-4 right-4 w-6 h-6 bg-gradient-to-br from-pink-300 to-pink-500 rounded-full shadow-lg opacity-80" />
      </div>
    </motion.div>
  );
};
