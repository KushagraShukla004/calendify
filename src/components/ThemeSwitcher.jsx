/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Palette, ChevronDown } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export const ThemeSwitcher = () => {
  const { theme, currentTheme, changeTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 ${theme.colors.accent} text-white rounded-lg ${theme.colors.accentHover} transition-colors font-medium ${theme.colors.shadow}`}
      >
        <Palette className="w-4 h-4" />
        <span className="hidden sm:inline">{themes[currentTheme].name}</span>
        <span className="text-lg">{themes[currentTheme].icon}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`absolute top-full mt-2 right-0 ${theme.colors.secondary} rounded-xl ${theme.colors.shadow} ${theme.colors.border} border z-20 overflow-hidden min-w-[200px]`}
            >
              <div className="p-2">
                {Object.entries(themes).map(([key, themeOption]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      changeTheme(key);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                      currentTheme === key
                        ? `${theme.colors.accent} text-white`
                        : `hover:bg-gray-100 ${theme.colors.text}`
                    }`}
                  >
                    <span className="text-xl">{themeOption.icon}</span>
                    <span className="font-medium">{themeOption.name}</span>
                    {currentTheme === key && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-2 h-2 bg-white rounded-full"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
