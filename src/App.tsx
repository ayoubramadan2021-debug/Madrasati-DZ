import { HashRouter } from "react-router-dom";

import AppRoutes from "./router/AppRoutes";
import { ThemeProvider, useAppTheme } from "./context/ThemeContext";

function AppContent() {
  const { theme, setThemeName } = useAppTheme();

  return (
    <HashRouter>
      <AppRoutes theme={theme} setThemeName={setThemeName} />
    </HashRouter>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
