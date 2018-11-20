import React, { Component } from "react";
import PropTypes from "prop-types";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import AddPersonalTask from "./modules/AddPersonalTask";
import AddCard from "./modules/AddCard";
import Paper from "@material-ui/core/Paper";
import utility from "./utils/utility";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";

const styles = theme => ({
  Footer: {
    height: "20px",
    background: "#f1f1f1",
    padding: "8px"
  },
  DivContainer: {
    width: "400px"
  },
  GotoWebsite: {
    float: "left",
    textDecoration: "underline",
    cursor: "pointer",
    color: green[500]
  },
  Copyright: {
    color: "grey",
    float: "right"
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      xsrfToken: "",
      userId: ""
    };
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  componentDidMount() {
    const self = this;
    utility.getUserState(self.props.AccessToken).done(response => {
      self.setState({
        xsrfToken: response.ppdata.xsrf,
        userId: response.ppdata.userid
      });
    });
  }
  handleOpenWebsite = event => {
    window.open("https://local.rnd.projectplace.com");
  };

  render() {
    const { value, xsrfToken, userId } = this.state;
    const { classes, accessToken } = this.props;
    return (
      <div>
        {xsrfToken ? (
          <div>
            <Paper square>
              <Tabs
                value={value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Add Personal Task" />
                <Tab label="Add Card" />
              </Tabs>
            </Paper>
            {value === 0 ? (
              <TabContainer>
                <div className={classes.DivContainer}>
                  <AddPersonalTask
                    xsrfToken={xsrfToken}
                    accessToken={accessToken}
                  />
                </div>
              </TabContainer>
            ) : (
              <TabContainer>
                <div className={classes.DivContainer}>
                  <AddCard
                    xsrfToken={xsrfToken}
                    accessToken={accessToken}
                    userId={userId}
                  />
                </div>
              </TabContainer>
            )}
            <footer className={classes.Footer}>
              <span
                className={classes.GotoWebsite}
                onClick={this.handleOpenWebsite}
              >
                Go to website
              </span>
              <span className={classes.Copyright}>
                &copy; Copyright 2018 Planview Inc
              </span>
            </footer>
          </div>
        ) : (
          <CircularProgress className={classes.progress} />
        )}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
