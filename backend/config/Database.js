import { Sequelize } from "sequelize"; //importing sequilize to use for database connection

const db = new Sequelize('authh_db','root','',{ //creating a db varaible to store datas of database and its credentials
    host:'localhost', //as we are running on local servet the host name is localhost
    dialect:'mysql' //dialect is to select whrethe it is mysql or nosql
});

export default db;//exporting db so it can be used in other files.