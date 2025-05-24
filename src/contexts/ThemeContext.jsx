/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const themes = {
  light: {
    name: "Light",
    icon: "☀️",
    colors: {
      primary: "from-blue-50 to-indigo-100",
      secondary: "bg-white",
      accent: "bg-blue-600",
      accentHover: "hover:bg-blue-700",
      text: "text-gray-900",
      textSecondary: "text-gray-600",
      border: "border-gray-200",
      shadow: "shadow-lg",
      calendar: "bg-white",
      calendarBorder: "border-gray-300",
      spiral: "bg-gray-400",
      spiralHole: "bg-gray-100",
    },
  },
  dark: {
    name: "Dark",
    icon: "🌙",
    colors: {
      primary: "from-gray-900 to-gray-800",
      secondary: "bg-gray-800",
      accent: "bg-purple-600",
      accentHover: "hover:bg-purple-700",
      text: "text-white",
      textSecondary: "text-gray-300",
      border: "border-gray-600",
      shadow: "shadow-2xl",
      calendar: "bg-gray-800",
      calendarBorder: "border-gray-600",
      spiral: "bg-gray-600",
      spiralHole: "bg-gray-700",
    },
  },
  pastel: {
    name: "Pastel Dreams",
    icon: "🌸",
    colors: {
      primary: "from-pink-50 to-purple-50",
      secondary: "bg-white",
      accent: "bg-pink-500",
      accentHover: "hover:bg-pink-600",
      text: "text-gray-800",
      textSecondary: "text-gray-600",
      border: "border-pink-200",
      shadow: "shadow-lg shadow-pink-100",
      calendar: "bg-gradient-to-br from-pink-50 to-purple-50",
      calendarBorder: "border-pink-300",
      spiral: "bg-pink-400",
      spiralHole: "bg-pink-100",
    },
  },
  ocean: {
    name: "Ocean Breeze",
    icon: "🌊",
    colors: {
      primary: "from-cyan-50 to-blue-100",
      secondary: "bg-white",
      accent: "bg-cyan-600",
      accentHover: "hover:bg-cyan-700",
      text: "text-gray-800",
      textSecondary: "text-gray-600",
      border: "border-cyan-200",
      shadow: "shadow-lg shadow-cyan-100",
      calendar: "bg-gradient-to-br from-cyan-50 to-blue-50",
      calendarBorder: "border-cyan-300",
      spiral: "bg-cyan-500",
      spiralHole: "bg-cyan-100",
    },
  },
  sunset: {
    name: "Sunset Glow",
    icon: "🌅",
    colors: {
      primary: "from-orange-50 to-red-100",
      secondary: "bg-white",
      accent: "bg-orange-600",
      accentHover: "hover:bg-orange-700",
      text: "text-gray-800",
      textSecondary: "text-gray-600",
      border: "border-orange-200",
      shadow: "shadow-lg shadow-orange-100",
      calendar: "bg-gradient-to-br from-orange-50 to-red-50",
      calendarBorder: "border-orange-300",
      spiral: "bg-orange-500",
      spiralHole: "bg-orange-100",
    },
  },
  forest: {
    name: "Forest Green",
    icon: "🌲",
    colors: {
      primary: "from-green-50 to-emerald-100",
      secondary: "bg-white",
      accent: "bg-green-600",
      accentHover: "hover:bg-green-700",
      text: "text-gray-800",
      textSecondary: "text-gray-600",
      border: "border-green-200",
      shadow: "shadow-lg shadow-green-100",
      calendar: "bg-gradient-to-br from-green-50 to-emerald-50",
      calendarBorder: "border-green-300",
      spiral: "bg-green-500",
      spiralHole: "bg-green-100",
    },
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("calendar-theme");
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem("calendar-theme", themeName);
  };

  const theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, changeTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
