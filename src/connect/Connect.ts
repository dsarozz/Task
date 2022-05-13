export var sequelizeObj: any = "";

export function initializeSequelize(dbName: string, userName: string, pass: string) {

    console.log("Initializing sequelize with:" + JSON.stringify(dbName));

    const Sequelize = require('sequelize');
    var Op = Sequelize.Op;

    sequelizeObj = new Sequelize(dbName, userName, pass, {

        dialect: 'postgres',
        omitNull: false,
        keepDefaultTimezone: true,
        logging: console.log,
        pool: {
            max: 25,
            min: 0,
            idle: 3000,
            acquire: 100000
        }
    });
}


export function Connect() {
    return sequelizeObj;
}