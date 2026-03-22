
import z from "zod" ;


export const signupSchema = z.object({
 name : z.string().min(2).max(20),
 email : z.string().min(3).max(30),
 password : z.string().min(6).max(30),
 role: z.enum(["STUDENT","TEACHER"])
})

export const signinSchema = z.object({
 email : z.string().min(3).max(30),
 password : z.string().min(6).max(30),

})

export const courseSchema = z.object({
 title : z.string().min(2).max(100),
 description: z.string().min(2).max(200),
 price :z.number().positive().max(10000000)
})

export const lessonSchema = z.object({
title : z.string().min(2),
 content : z.string(),
})


export const PurchaseCourseSchema = z.object({
  courseId : z.string()
})
    

