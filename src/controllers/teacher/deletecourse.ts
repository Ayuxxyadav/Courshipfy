import { NextFunction ,Request , Response } from "express";

import { prisma } from "../../database/db";





export const DeleteCourse = async(req:Request , res:Response ) => {

    try {

        const userId = req.userId ;
        const courseId = req.params.id as string;
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

        const deleteData = await prisma.course.delete({
           where : {
            id : data.id
           }
        })
        return res.status(200).json({
            message:"Course deleted successfully",
            data : [deleteData]
           })

     } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}