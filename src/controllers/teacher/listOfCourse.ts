

import { Request , Response } from "express";

import { prisma } from "../../database/db";



export const ListOfCourse = async(req:Request , res:Response ) => {

    try {

        const userId = req.userId ;
        if(!userId){
            return res.status(400).json({
                message:"Invalid REQ"
            })
        }
       const courseDb = await prisma.course.findMany({
        where: {
            instructorId :userId
        },
       orderBy : {
        createdAt :"desc"
       }
       })
        return res.status(201).json({
            message:"List of courses created by Instructor",
            allCourse:[courseDb]
           })

     } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}