/* eslint-disable no-unused-vars */
import { motion } from "motion/react";
import { X, Calendar } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export const DatePickerModal = ({
  isOpen,
  onClose,
  dateInput,
  handleDateInputChange,
  dateError,
  validateAndNavigateToDate,
}) => {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className={`${theme.colors.secondary} p-6 rounded-2xl ${theme.colors.shadow} border-2 ${theme.colors.border} max-w-md w-full`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 ${theme.colors.accent} rounded-lg flex items-center justify-center`}
              >
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h3 className={`text-xl font-bold ${theme.colors.text}`}>Go to Date</h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label
                  className={`block text-sm font-medium ${theme.colors.textSecondary} mb-2`}
                >
                  Month
                </label>
                <input
                  type="text"
                  placeholder="MM"
                  value={dateInput.month}
                  onChange={(e) => handleDateInputChange("month", e.target.value)}
                  className={`w-full px-3 py-2 border-2 ${theme.colors.border} rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium ${theme.colors.textSecondary} mb-2`}
                >
                  Day
                </label>
                <input
                  type="text"
                  placeholder="DD"
                  value={dateInput.day}
                  onChange={(e) => handleDateInputChange("day", e.target.value)}
                  className={`w-full px-3 py-2 border-2 ${theme.colors.border} rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
              </div>
              <div>
                <label
                  className={`block text-sm font-medium ${theme.colors.textSecondary} mb-2`}
                >
                  Year
                </label>
                <input
                  type="text"
                  placeholder="YYYY"
                  value={dateInput.year}
                  onChange={(e) => handleDateInputChange("year", e.target.value)}
                  className={`w-full px-3 py-2 border-2 ${theme.colors.border} rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                />
              </div>
            </div>

            {dateError && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200"
              >
                {dateError}
              </motion.p>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={validateAndNavigateToDate}
                className={`px-6 py-2 ${theme.colors.accent} text-white rounded-lg ${theme.colors.accentHover} transition-colors font-medium`}
              >
                Go to Date
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
