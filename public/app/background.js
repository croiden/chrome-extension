/*global OAuth2*/
var projectplace = new OAuth2("projectplace", {
  client_id: process.env.API_KEY,
  client_secret: process.env.API_SECRET,
  api_scope: "https://local.rnd.projectplace.com/oauth2/authorize"
});

//projectplace.authorize(function() {
//console.log(projectplace.getAccessToken());
// var TASK_CREATE_URL =
//   "https://local.rnd.projectplace.com/api/v2/assignments/";

// // Make an XHR that creates the task
// var xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function(event) {
//   if (xhr.readyState == 4) {
//     if (xhr.status == 200) {
//       // Great success: parse response with JSON
//       var task = JSON.parse(xhr.responseText);
//       console.log(task.id);
//     } else {
//       // Request failure: something bad happened
//     }
//   }
// };

// var message = "title=Created from background js";

// xhr.open("POST", TASK_CREATE_URL, true);

// xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
// //xhr.setRequestHeader("x-xsrf-token", "tvEjVs6jmkGi0mhrblkGtzv9JZ_yIZht");
// xhr.setRequestHeader(
//   "Authorization",
//   "Bearer " + projectplace.getAccessToken()
// );

// xhr.send(message);
//});
