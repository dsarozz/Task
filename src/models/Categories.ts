const Sequelize = require('sequelize');
const moment = require('moment');

export class Categories {
    Categories(context: any) {
        var categories = this.CategoryModel(context);
        return categories;
    };

    private CategoryModel(context: any) {
        return context.define('Categories',
            {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                guid: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV1,
                },
                modified: {
                    type: 'TIMESTAMP',
                    // defaultValue: moment().format()
                },
                created: {
                    type: 'TIMESTAMP'
                },
                deleted: {
                    type: 'TIMESTAMP'
                },
                name: {
                    type: Sequelize.STRING
                }
            },
            {
                tableName: 'categories',
                timestamps: false
            });

    };
}

