import { Connect } from '../connect/Connect';
import { UserService } from "../services/UserService";
// import { UserLoginInfoService } from "../services/UserLoginInfoService";
import moment = require('moment');
const fs = require('fs');

export class AuthenticationController {

    async Login(req, res) {

        var userName = req.body.username;
        var password = req.body.password;

        const context = await Connect();

        try {
            let userService = new UserService(context);
            let result = await userService.Login(userName, password);
            if (result) {
                res.status(200).send('Login Successful')
            } else {
                res.status(200).send('Login Failed')
            }
        }
        catch (error) {
            return res.status(401).send({ message: error.message });
        }
    }

    async Authorize(req, res, next) {

        const context = await Connect();

        var auth = req.get('Session-Status');

        try {
            if (auth) {
                return next();
            } else {
                return res.status(401).send('Unauthorized');
            }
        }
        catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }

    async Logout(req, res) {

        const context = await Connect();

        try {
            // let userLoginInfoService = new UserLoginInfoService(context);

            var authKey = req.get('X-Security-AuthKey');

            // await userLoginInfoService.logout(authKey);

            return res.status(200).send('Logout Successful');
        }
        catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }

}