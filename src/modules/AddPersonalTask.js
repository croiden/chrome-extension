import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import utility from "../utils/utility";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";

const styles = theme => ({
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

class AddPersonalTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      dueDate: "",
      success: false,
      error: false,
      loading: false,
      taskId: ""
    };
  }

  handleSubmitClick = event => {
    const self = this;
    const { accessToken, xsrfToken } = self.props;
    this.setState(
      {
        loading: true
      },
      () => {
        utility
          .createTask(
            accessToken,
            xsrfToken,
            self.state.title,
            self.state.dueDate
          )
          .done(response => {
            var task = response;
            self.setState({
              title: "",
              dueDate: "",
              success: true,
              taskId: task.id,
              error: false,
              loading: false
            });
          })
          .fail((jqXHR, exception) => {
            self.setState({
              success: false,
              error: true,
              loading: false
            });
          });
      }
    );
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { loading, title, dueDate } = this.state;
    const { classes } = this.props;
    return (
      <form autoComplete="off">
        <div>
          <TextField
            label="Title"
            value={title}
            onChange={this.handleChange("title")}
            margin="normal"
            fullWidth="true"
            autoFocus="true"
          />
        </div>
        <div>
          <TextField
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={this.handleChange("dueDate")}
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            fullWidth="true"
          />
        </div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmitClick}
            fullWidth="true"
            disabled={!title}
          >
            Add Task
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
        {this.state.success ? (
          <div>
            Successfully created personal task with ID{" "}
            <span>{this.state.taskId}</span>
          </div>
        ) : null}
        {this.state.error ? (
          <div>Error occured while creating the task.</div>
        ) : null}
      </form>
    );
  }
}
AddPersonalTask.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddPersonalTask);
