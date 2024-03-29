import { Sequelize } from "sequelize";
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    fname:{
        type:DataTypes.STRING
    },
    lname:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    contact:{
        type:DataTypes.STRING
    },
    role:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    location: {
        type:DataTypes.STRING,
    },
    is_verified:{
        type:DataTypes.INTEGER,
    },
    token:{
        type:DataTypes.TEXT,
    },
    refresh_token:{
        type:DataTypes.TEXT
    },
},{
    freezeTableName:true
});

export default Users;