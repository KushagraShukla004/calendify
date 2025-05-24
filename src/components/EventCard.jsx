/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { Clock, MapPin } from "lucide-react";

export const EventCard = ({ event, isSmall = false }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    whileHover={{
      scale: 1.05,
      y: -2,
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    }}
    whileTap={{ scale: 0.95 }}
    className={`${
      event.color
    } text-white text-xs p-2 rounded-lg mb-1 cursor-pointer shadow-sm transition-all duration-200 relative overflow-hidden ${
      isSmall ? "truncate" : ""
    }`}
    title={`${event.title} - ${event.time}`}
  >
    {/* Background pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 right-0 w-8 h-8 bg-white rounded-full transform translate-x-4 -translate-y-4" />
      <div className="absolute bottom-0 left-0 w-6 h-6 bg-white rounded-full transform -translate-x-3 translate-y-3" />
    </div>

    <div className="relative z-10">
      <div className="flex items-center gap-1 mb-1">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
        >
          <Clock className="w-3 h-3" />
        </motion.div>
        <span className="font-semibold truncate">{event.title}</span>
      </div>

      {!isSmall && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs opacity-90 flex items-center gap-1"
        >
          <MapPin className="w-2 h-2" />
          {event.time} • {event.duration}min
        </motion.div>
      )}
    </div>
  </motion.div>
);
