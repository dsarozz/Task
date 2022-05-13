import { Connect } from "../connect/Connect";
import { UserMapper } from "../mapper/UserMapper";
import { UserService } from "../services/UserService";
var fs = require('fs');

export class UserController {

    async UpsertUser(req, res) {
        const context = await Connect();

        var user = req.body ? req.body : '';

        if (user == null || user == '') {
            return res.status(400).send({ message: 'Payload not found!' });
        }

        if (!user.username) {
            return res.status(400).send({ message: 'Username cannot be empty!' });
        }

        try {
            let userService = new UserService(context);
            let mapper = new UserMapper();

            var model: any = await mapper.DTOtoModel(user);
            let result: any = await userService.Upsert(model);

            return res.status(200).send({ id: result });
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }

    async DeleteUser(req, res) {
        const context = await Connect();
        var userID = req.params.id;

        try {
            let userService = new UserService(context);
            await userService.delete({ deleted: null, id: userID }, null);
            return res.status(200).send("");
        }
        catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }
}