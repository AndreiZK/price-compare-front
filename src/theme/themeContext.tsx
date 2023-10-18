import { createContext, useState, useEffect, ReactNode } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext<ThemeContextValue>({ theme: "dark" });

interface ThemeContextValue {
  theme: string;
  toggleTheme?: () => void;
}

interface ProviderProps {
  children: ReactNode;
}

const ThemeContextProvider = (props: ProviderProps) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.style.backgroundColor =
      theme === "light" ? "white" : "#121212";
  }, [theme]);

  const dark = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const light = createTheme({
    palette: {
      mode: "light",
    },
  });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme === "light" ? light : dark}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContextProvider, ThemeContext };
