const Sequelize = require('sequelize');
import { IRepository } from './contracts/IRepository';
const moment = require("moment");


export class Repository<T> implements IRepository<T> {

    // protected context: Sequelize;
    private dbContext: any;

    constructor(context: any) {
        this.dbContext = context;
    }

    async delete(whereClause: any, userId: number): Promise<string> {

        if (userId) {
            await this.dbContext.sequelize.query('set myvar.userid = ' + userId);
        }

        var updateClause = {
            deleted: moment().format(),
        };

        var deletedItem = await this.dbContext.update(updateClause, {
            where: whereClause,
            returning: true
        });
        return deletedItem[1];
    }

} 