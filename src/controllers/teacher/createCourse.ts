import { NextFunction ,Request , Response } from "express";
import { courseSchema } from "../../zod/inputpValidation";
import { prisma } from "../../database/db";





export const CreateCourse = async(req:Request , res:Response ) => {

    try {

        const userId = req.userId ;
        if(!userId){
            return res.status(400).json({
                message:"Invalid REQ"
            })
        }
        
        const parsedData = courseSchema.safeParse(req.body);
        if(!parsedData.success){
        return res.status(422).json({
            message:"I/p validation failed"
           })
        }

       const {title ,description ,price } = parsedData.data ;

       const courseDb = await prisma.course.create({
        data : {
             title : title ,
             description : description ,
             price : price,
             instructorId:userId
        }
       })
        return res.status(201).json({
            message:"Course created successfully",
            courseId : courseDb.id,
            title : courseDb.title,
            createdAt : courseDb.createdAt
           })

     } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}