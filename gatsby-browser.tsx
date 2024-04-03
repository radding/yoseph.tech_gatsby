import React from "react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./src/theme";
import "./src/app.css";

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>;
};
