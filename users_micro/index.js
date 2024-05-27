// const createUserRouter=require('./Router/createUserRouter')
// const loginRouter=require('./Router/loginRouter')
// const getrouter=require('./Router/getAllUserRouter')
import token from "./authenticateToken.js";
import express from "express";
import user from "./controller/user_controller.js";
import login from "./controller/login_controller.js";
import { getAllUsers } from "./controller/getAllUsers_controller.js";
import { getPartiuser } from "./controller/getAllUsers_controller.js";
import cookieParser from "cookie-parser";
import { update } from "./controller/updateUser_controller.js";
const app = express();
const port = 5000;
app.use(express.json());
app.use(cookieParser());
// Body parsing middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.post("/", user);
app.post("/login", login);
app.get("/getuser", getAllUsers);
app.get("/getuser/:emailId", getPartiuser);

app.put("/updateuser", update);

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
