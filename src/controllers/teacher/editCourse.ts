import { NextFunction ,Request , Response } from "express";
import { courseSchema } from "../../zod/inputpValidation";
import { prisma } from "../../database/db";





export const EditCourse = async(req:Request , res:Response ) => {

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
        


       const {title ,description ,price } = req.body

       const data = await prisma.course.findFirst({
        where : {
            id : courseId
        }
       })

        if(!data){
        return res.status(422).json({
            message:"Course not found"
           })
        }

        if(data.instructorId !== userId){
        return res.status(422).json({
            message:"Course not found"
           })            
        }

        const editData = await prisma.course.update({
           where : {
            id : data.id
           },
           data : {
            title : title ,
            description : description ,
            price : price
           }
        })



        return res.status(201).json({
            message:"Course edited successfully",
            courseId : editData.id,
            title : editData.title,
            updatedAt : editData.updatedAt
           })

     } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}