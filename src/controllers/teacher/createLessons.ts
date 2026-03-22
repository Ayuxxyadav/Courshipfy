import { NextFunction ,Request , Response } from "express";
import { lessonSchema } from "../../zod/inputpValidation";
import { prisma } from "../../database/db";





export const CreateLessons = async(req:Request , res:Response ) => {

    try {

        const userId = req.userId ;
        const courseId = req.params.id as string ;

        if(!userId){
            return res.status(400).json({
                message:"Invalid REQ"
            })
        }
        if(!courseId){
            return res.status(400).json({
                message:"provide correct CourseId"
            })
        }
        
        const parsedData = lessonSchema.safeParse(req.body);
        if(!parsedData.success){
        return res.status(422).json({
            message:"I/p validation failed"
           })
        }

       const {title , content } = parsedData.data ;

       const lessonDb = await prisma.lesson.create({
        data : {
             title : title ,
             content : content ,
             courseId:courseId ,
        }
       })
        return res.status(201).json({
            message:"Lessons created successfully",
            lessonsId : lessonDb.id,
            title : lessonDb.title,
            createdAt : lessonDb.createdAt
           })

     } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}