

import { Request , Response } from "express";

import { prisma } from "../../database/db";



export const ListOfLessons = async(req:Request , res:Response ) => {

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



       const lessonDb = await prisma.lesson.findMany({
        where: {
            courseId : courseId
        },
       orderBy : {
        createdAt :"desc"
       }
       })
        return res.status(201).json({
            message:"List of Lessons created by Instructor",
            allLesson:[lessonDb]
           })

     } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}