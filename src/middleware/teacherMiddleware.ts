import { Request , Response , NextFunction } from "express";



export const TeacherMiddleware = (req:Request ,res:Response,next:NextFunction)=>{
    if(req.role === "STUDENT"){
            return res.status(400).json({
            message:"Invalid request! Only teacher can access"
        })
    }
    next();
}