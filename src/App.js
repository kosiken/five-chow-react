import React from "react";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { Provider } from "react-redux";
import store from "./store";
import MainPage from "./pages/MainPage";
import { createMuiTheme } from "@material-ui/core/styles";
import "./App.css";
const theme = createMuiTheme({
  palette: {
    primary: { main: "#f0324b" },
    secondary: { main: "#011627" },
    info: { main: "#ffdc4a" },
    success: { main: "#ffffff" },
  },
  status: {
    danger: "orange",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <MainPage />
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
