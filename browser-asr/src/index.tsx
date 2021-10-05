import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import BigWhitePanel from "./components/WhitePanel";
import reportWebVitals from "./reportWebVitals";
import {
  createMuiTheme,
  colors,
  ThemeProvider,
  CssBaseline,
} from "@material-ui/core";
import { RecoilRoot } from "recoil";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1A73E9",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: colors.red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  spacing: 12,
});

const alertConfig = { // TODO custom style alert
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '5px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <AlertProvider template={AlertTemplate} {...alertConfig}>
          <BigWhitePanel/>
        </AlertProvider>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
