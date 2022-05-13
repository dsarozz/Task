import { IRepository } from "../repository/contracts/IRepository";
import { Op } from 'sequelize';

export class GenericService<T> {

    protected repository: IRepository<T>;

    constructor(repository: IRepository<T>) {
        this.repository = repository;
    }

    //update datedeleted by guid
    async delete(whereClause: any, userId: number): Promise<string> {
        var deletedItem = await this.repository.delete(whereClause, userId);
        return deletedItem;
    }

}