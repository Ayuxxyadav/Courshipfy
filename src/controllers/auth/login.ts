import { Request , Response } from "express"
import { signinSchema } from "../../zod/inputpValidation"
import bcrypt from "bcrypt"
import { prisma } from "../../database/db";
import jwt from "jsonwebtoken"


const SECRET = process.env.JWT_SECRET as string ;


export const LoginPage = async(req:Request ,res:Response)=>{
    const parsedData = signinSchema.safeParse(req.body);
   
    try {

        if(!parsedData.success){
        return res.status(422).json({
            message:"I/p validation failed"
        })
    }

    const {  email , password } = parsedData.data ;

    const signinData = await prisma.user.findFirst({
        where : {
            email : email
        }
    })
     if ( !signinData){
        return res.status(404).json({
            message:"email or password not matched you have to re-enter the details"
        })
     }
    
     const comparePassword = await bcrypt.compare(password,signinData.password)
          if ( !comparePassword){
        return res.status(404).json({
            message:"email or password not matched you have to re-enter the details"
        })
     }

     const token = jwt.sign({
        userId :signinData.id,
        role : signinData.role
     },SECRET)
        return res.status(200).json({
            token : token ,
            message:"User successfully logged in"
        })
    
   } catch (error) {
    console.log(error);
    res.status(500).json({
        message:"Internal server error "
    })
  }


}
