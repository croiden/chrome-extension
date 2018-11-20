import $ from "jquery";

const utilty = {
  createTask: (accessToken, xsrfToken, title, dueDate) => {
    return $.ajax({
      type: "POST",
      url: "https://local.rnd.projectplace.com/api/v2/assignments/",
      data: { title: title, due_date: dueDate }, //format 2018 - 11 - 24
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "x-xsrf-token": xsrfToken,
        Authorization: "Bearer " + accessToken
      }
    });
  },
  createCard: (accessToken, xsrfToken, title, projectId, boardId, userId) => {
    return $.ajax({
      type: "POST",
      url: `https://local.rnd.projectplace.com/api/v1/projects/${projectId}/cards/create-new`,
      data: JSON.stringify({
        board_id: boardId,
        assignee_id: userId,
        title: title
      }),
      headers: {
        "Content-Type": "application/json",
        "x-xsrf-token": xsrfToken,
        Authorization: "Bearer " + accessToken
      }
    });
  },
  getUserState: accessToken => {
    return $.ajax({
      type: "GET",
      url:
        "https://local.rnd.projectplace.com/api/v1/user/me/state?template_mode=false",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
  },
  getUserProjects: accessToken => {
    return $.ajax({
      type: "GET",
      url: "https://local.rnd.projectplace.com/api/v1/user/me/projects",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
  },
  getProjectBoards: (accessToken, projectId) => {
    return $.ajax({
      type: "GET",
      url: `https://local.rnd.projectplace.com/api/v1/projects/${projectId}/boards`,
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
  }
};
export default utilty;
