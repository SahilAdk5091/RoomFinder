import Booked from "../models/Booked.js";

export const getBookedRoomById = async(req,res)=>{
    try {
        const response = await Booked.findAll(
            {
                where:{
                    userid: req.params.userid
                }
            });
        res.status.json(response);
    } catch (error) {
        console.log(error.message);
    }
    
}
