import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;
const Room = db.define('room',{
    name:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true
        }
    },
    location: {
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    price:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    service:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            isEmail:true
        }
    },
    contact:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    image: DataTypes.STRING,
    url: DataTypes.STRING
},{
    freezeTableName: true
});

export default Room;

(async()=>{
    await db.sync();
})();