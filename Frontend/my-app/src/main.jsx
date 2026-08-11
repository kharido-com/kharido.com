import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/seller.css";

import App from "./App.jsx";

import { Provider } from "react-redux";
import { store } from "./redux/store.js";

// Material UI
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);