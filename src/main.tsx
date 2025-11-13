import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageStyleProvider } from "./contexts/LanguageStyleContext.tsx";
// import BasicDetails from "./pages/basic-details.tsx/BasicDetails.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageStyleProvider>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </LanguageStyleProvider>
  </StrictMode>
);
