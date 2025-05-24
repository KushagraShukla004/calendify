/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { format } from "date-fns";
import { Calendar, Clock, Users, MapPin, Star } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export const EventDetails = ({ date, getEventsForDate }) => {
  const { theme } = useTheme();
  const events = getEventsForDate(date);

  if (events.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
        <p className={`${theme.colors.textSecondary} text-lg`}>No events scheduled</p>
        <p className={`${theme.colors.textSecondary} text-sm mt-2`}>
          Enjoy your free day! 🌟
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pb-4 border-b-2 border-dashed border-gray-200"
      >
        <h3 className={`font-bold text-xl ${theme.colors.text} mb-2`}>
          {format(date, "EEEE")}
        </h3>
        <p className={`${theme.colors.textSecondary} text-lg`}>
          {format(date, "MMMM d, yyyy")}
        </p>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-full"
        >
          <Star className="w-4 h-4 text-yellow-600" />
          <span className="text-yellow-800 font-medium text-sm">
            {events.length} event{events.length > 1 ? "s" : ""}
          </span>
        </motion.div>
      </motion.div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02, y: -2 }}
            className={`${theme.colors.secondary} p-4 rounded-xl ${theme.colors.shadow} ${theme.colors.border} border relative overflow-hidden`}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full transform translate-x-10 -translate-y-10 opacity-30" />

            <div className="relative z-10">
              <div className="flex items-start gap-3">
                <motion.div
                  className={`w-4 h-4 rounded-full ${event.color} mt-1 shadow-lg`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5,
                  }}
                />
                <div className="flex-1">
                  <h4 className={`font-bold ${theme.colors.text} text-lg mb-2`}>
                    {event.title}
                  </h4>

                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <motion.div
                      className={`flex items-center gap-2 ${theme.colors.textSecondary}`}
                      whileHover={{ x: 4 }}
                    >
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{event.time}</span>
                    </motion.div>

                    <motion.div
                      className={`flex items-center gap-2 ${theme.colors.textSecondary}`}
                      whileHover={{ x: 4 }}
                    >
                      <Users className="w-4 h-4" />
                      <span>{event.duration} minutes</span>
                    </motion.div>

                    <motion.div
                      className={`flex items-center gap-2 ${theme.colors.textSecondary}`}
                      whileHover={{ x: 4 }}
                    >
                      <MapPin className="w-4 h-4" />
                      <span className="capitalize">{event.type}</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
