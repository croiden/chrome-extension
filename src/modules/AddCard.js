import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { FormControl } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import utility from "../utils/utility";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";

const styles = theme => ({
  formControl: {
    marginBottom: 10,
    minWidth: 400
  },
  AddandOpen: {
    textAlign: "center",
    paddingTop: 8
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

class AddCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      workspace: "",
      board: "",
      success: false,
      error: false,
      loading: false,
      cardId: "",
      workspaces: [],
      boards: []
    };
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleWorkspaceChange = event => {
    const self = this;
    this.setState(
      {
        workspace: event.target.value,
        boards: []
      },
      () => {
        const { accessToken } = self.props;
        utility
          .getProjectBoards(accessToken, self.state.workspace)
          .done(response => {
            self.setState({
              boards: response
            });
          })
          .fail((jqXHR, exception) => {});
      }
    );
  };

  componentDidMount() {
    const self = this;
    const { accessToken } = self.props;
    utility
      .getUserProjects(accessToken)
      .done(response => {
        self.setState({
          workspaces: response
        });
      })
      .fail((jqXHR, exception) => {});
  }
  handleSubmitClick = action => event => {
    const self = this;
    const { accessToken, xsrfToken, userId } = self.props;
    const { title, workspace, board } = self.state;
    this.setState(
      {
        loading: true
      },
      () => {
        utility
          .createCard(accessToken, xsrfToken, title, workspace, board, userId)
          .done(response => {
            var task = response;
            if (action === "AddandOpen") {
              window.open(
                `https://local.rnd.projectplace.com/#project/${workspace}/board/${board}/card/${
                  task.id
                }`
              );
            }
            self.setState({
              title: "",
              workspace: "",
              board: "",
              boards: [],
              success: true,
              cardId: task.id,
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
  render() {
    const { classes } = this.props;
    const {
      title,
      workspace,
      board,
      success,
      error,
      cardId,
      workspaces,
      boards,
      loading
    } = this.state;
    return (
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="workspace-simple">Workspace</InputLabel>
          <Select
            value={workspace}
            inputProps={{
              name: "workspace",
              id: "workspace-simple"
            }}
            onChange={this.handleWorkspaceChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {workspaces.map(val => {
              return <MenuItem value={val.id}>{val.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="board-simple">Board</InputLabel>
          <Select
            value={board}
            inputProps={{
              name: "board",
              id: "board-simple"
            }}
            onChange={this.handleChange("board")}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {boards.map(val => {
              return <MenuItem value={val.id}>{val.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
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
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmitClick("Add")}
            fullWidth="true"
            disabled={!title || !workspace || !board}
          >
            Add Card
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
          <div className={classes.AddandOpen}>
            <Button
              color="primary"
              onClick={this.handleSubmitClick("AddandOpen")}
              disabled={!title || !workspace || !board}
              size="small"
            >
              Add Card &amp; Open
            </Button>
          </div>
        </div>
        {success ? (
          <div>
            Successfully created card with ID <span>{cardId}</span>
          </div>
        ) : null}
        {error ? <div>Error occured while creating the card.</div> : null}
      </form>
    );
  }
}
AddCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddCard);
