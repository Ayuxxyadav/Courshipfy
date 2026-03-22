import { NextFunction ,Request,Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken" ;

const SECRET = process.env.JWT_SECRET as string

interface token extends JwtPayload {
    userId : string ;
    role : "TEACHER"|"STUDENT"
}


export const UserMiddleware = (req:Request ,res:Response ,next :NextFunction )=>{

    try {
        const token = req.headers.authorization; 
    if(!token){
            return res.status(400).json({
            message:"Token not found"
        })
    }

    const decodedToken = jwt.verify(token,SECRET) as JwtPayload

    if(!decodedToken){
        return res.status(400).json({
            message:"Invalid request"
        })
    }

    req.userId = decodedToken.userId
    req.role = decodedToken.role
    next();

    } catch (error) {
        console.log("server error");
        
    }
}



