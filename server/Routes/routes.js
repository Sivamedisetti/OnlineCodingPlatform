const express = require("express");
const Router = express.Router();
const controller = require('../Controller/controllers');

Router.post('/signup', controller.SignUp);
Router.post('/login', controller.SignIn);
Router.post('/post_problem', controller.AddProblem);

Router.get('/get_problemdata/:id', controller.GetProblem);
Router.get('/getcodesheet', controller.GetAllProblems);
Router.get('/getPendingList', controller.GetPendingList);

Router.put('/update_status', controller.UpdateStatus);

Router.delete('/delete_problem/:id', controller.DeleteProblem);

module.exports = Router;