import { GenericService } from "./GenericService";
import { Repository } from "../repository/Repository";
import { Categories } from "../models/Categories"
const Sequelize = require("sequelize");

export class CategoryService<T> extends GenericService<T> {

    protected dbContext: any;
    protected category: any;

    constructor(context) {
        let categories = new Categories();
        var category = categories.Categories(context);

        super(new Repository(category));

        this.category = category;
        this.dbContext = context;
    }

    async Load() {
    }

    async Upsert() {

    }

}