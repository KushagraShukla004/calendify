/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";

export const SpiralBinding = () => {
  const { theme } = useTheme();

  const spiralHoles = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-center items-center z-10">
      {/* Spiral wire */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${theme.colors.spiral} rounded-full`}
      />

      {/* Spiral holes */}
      {spiralHoles.map((hole, index) => (
        <motion.div
          key={hole}
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.3,
            delay: 0.1 * index,
            type: "spring",
            stiffness: 200,
          }}
          className={`w-6 h-6 ${theme.colors.spiralHole} rounded-full border-2 ${theme.colors.calendarBorder} shadow-inner mb-2 relative`}
        >
          <div
            className={`absolute inset-1 ${theme.colors.spiral} rounded-full opacity-30`}
          />
        </motion.div>
      ))}
    </div>
  );
};
