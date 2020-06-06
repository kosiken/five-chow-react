import React from "react";
import ThemeProvider from "@material-ui/styles/ThemeProvider";

import MainPage from "./pages/MainPage";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary:{ main: "#f0324b"},
    secondary: {main:"#e5298b"},
    info: {main:"#0ba4db"},
    
  },
  status: {
    danger: "orange",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <MainPage />
      </ThemeProvider>
    </div>
  );
}

export default App;
