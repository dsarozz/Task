import { Users } from "../models/Users";
import { Repository } from "../repository/Repository";
import { GenericService } from "./GenericService";

const moment = require('moment');
const Sequelize = require('sequelize');

export class UserService<T> extends GenericService<T> {

    protected dbContext: any;
    protected user: any;

    constructor(context) {
        let users = new Users();
        var user = users.Users(context);

        super(new Repository(user));

        this.user = user;
        this.dbContext = context;
    }

    async Login(username: string, password: string) {
        var result = await this.dbContext.query(`SELECT * FROM public.login(:varusername, :varpassword)`,
            {
                replacements: { varusername: username, varpassword: password },
                type: Sequelize.QueryTypes.SELECT
            })

        return result[0].login;
    }

    async Upsert(user: any) {
        var result = await this.dbContext.query(`SELECT * FROM public.upsert_user(:user)`, {
            replacements: { user: JSON.stringify(user) },
            type: Sequelize.QueryTypes.SELECT
        })

        return result[0].upsert_user;
    }

    async DeleteUser(userId: string) {
        var result = await this.dbContext.query('SELECT * FROM public.delete_user(:userid)', {
            replacements: { userid: userId }, type: Sequelize.QueryTypes.SELECT
        });

        return result;
    }

}