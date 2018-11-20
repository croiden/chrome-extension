import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#8ab98e", contrastText: "#fff" }
  }
});

/*global chrome*/
const projectplace = chrome.extension.getBackgroundPage().projectplace;
projectplace.authorize(function() {
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <App accessToken={projectplace.getAccessToken()} />
    </MuiThemeProvider>,
    document.getElementById("root")
  );
});
