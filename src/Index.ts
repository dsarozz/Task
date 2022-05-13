import { initializeSequelize } from "./connect/Connect";
// import { UserController } from "./controllers/UserController";
import { DB_NAME, DB_PASSWORD, DB_USERNAME, PORT } from './AppConfig'
// import { CategoryController } from "./controllers/CategoryController";
import { AuthenticationController } from "./controllers/AuthenticateController";
import { UserController } from "./controllers/UserController";

const express = require('express');
const http = require('http');

const app = express();

initializeSequelize(DB_NAME, DB_USERNAME, DB_PASSWORD);

//HTTP server.. 
var httpServer = http.createServer(app).listen(PORT, function () {
    console.log(`Server started at Port ${PORT} for HTTP`);
});
httpServer.timeout = 300000;
//End StartHTTP server

const router = express.Router();

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: "100mb", extended: true, parameterLimit: 100000 }));

app.use("/", router);

app.use(customErrorHandler);

app.get(`/Ping/:param?`, (req, res) => {
    let response: any = { status: 'UP' };
    if (req.params.param) {
        response.param = req.params.param;
    }
    res.send(response);
});

//##region middlewares
function authorize(req, res, next) { new AuthenticationController().Authorize(req, res, next); };
//##region end


//##approvals
router.post('/login', (req, res) => { new AuthenticationController().Login(req, res) })
router.post('/logout', authorize, (req, res) => { new AuthenticationController().Logout(req, res) })
// router.get('/users/:id', authorize, (req, res) => { new UserController().GetUser(req, res) });
router.post('/users/signup', authorize, (req, res) => { new UserController().UpsertUser(req, res) });
router.delete('/users/:id', authorize, (req, res) => { new UserController().DeleteUser(req, res) });
// router.get('/categories/:id', authorize, (req, res) => { new CategoryController().GetCategory(req, res) });
// router.post('/categories', authorize, (req, res) => { new CategoryController().UpsertCategory(req, res) });


app.use(function (req, res, next) {
    console.log("Nodeapi request not found");
    res.status(400).send({ message: "Node api Bad Request!!" });
});

function customErrorHandler(err, req, res, next) {
    console.log("customErrorHandler...Error" + err);
    res.status(400).send({ message: "Not allowed!" });
}