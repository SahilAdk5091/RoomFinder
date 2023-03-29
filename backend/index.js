import express from "express";//exporting express
import db from './config/Database.js';//importing Database.js and its components in index.js file
//import Users from "./models/UserModel.js";
import Room from "./models/RoomModels.js";
import RooomRoute from "./routes/RoomRoute.js";
import dotenv from 'dotenv';
import FileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import cors from 'cors';
import router from "./routes/index.js";
dotenv.config();
const app = express();//creating a new varaible object of express

try {
    await db.authenticate();//runnign the authenticate method to connect the databse.
    console.log('Database connected');//prints database connected if the connection is sucessfull
    await Room.sync();
} catch (error) { // catch to catch eroor 
    console.error(error); // prints error in terminal
}

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(RooomRoute);
app.use(router);

app.listen(5000,()=> console.log('Server running at port 5000'));// server will run on port 5000