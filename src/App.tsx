import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Router from "./router/router";
import { ThemeContextProvider } from "./theme/themeContext";

function App() {
  return (
    <ThemeContextProvider>
      <Router />
      <ToastContainer position="bottom-right" autoClose={1000} closeOnClick />
    </ThemeContextProvider>
  );
}

export default App;
