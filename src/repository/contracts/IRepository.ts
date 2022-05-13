export interface IRepository<T> {

    delete(whereClause: any, userId: number): Promise<string>;

}