const Sequelize = require('sequelize');
const moment = require('moment');

export class Users {
    Users(context: any) {
        var users = this.UserModel(context);
        return users;
    };

    private UserModel(context: any) {
        return context.define('Users',
            {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
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
                username: {
                    type: Sequelize.STRING
                },
                active: {
                    type: Sequelize.BOOLEAN
                },
                password: {
                    type: Sequelize.STRING
                }
            },
            {
                tableName: 'users',
                timestamps: false
            });

    };
}

