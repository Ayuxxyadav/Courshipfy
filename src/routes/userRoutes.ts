import express from "express"; 
import { SignupPage } from "../controllers/auth/signup";
import { LoginPage } from "../controllers/auth/login";
import { TeacherMiddleware } from "../middleware/teacherMiddleware";
import { CreateCourse } from "../controllers/teacher/createCourse";
import { UserMiddleware } from "../middleware/userMiddleware";
import { ListOfCourse } from "../controllers/teacher/listOfCourse";
import { EditCourse } from "../controllers/teacher/editCourse";
import { DeleteCourse } from "../controllers/teacher/deletecourse";
import { CreateLessons } from "../controllers/teacher/createLessons";
import { ListOfLessons } from "../controllers/teacher/listOfLessons";

const router = express.Router();




router.post("/auth/signup", SignupPage ) ;
router.post("/auth/signin", LoginPage ) ;

// only teacher can access this route 
router.get("/courses", UserMiddleware ,TeacherMiddleware,ListOfCourse ) ; 
router.post("/courses", UserMiddleware ,TeacherMiddleware , CreateCourse ) ;
router.put("/courses/:id", UserMiddleware ,TeacherMiddleware , EditCourse );
router.delete("/courses/:id", UserMiddleware ,TeacherMiddleware , DeleteCourse );
router.post("/courses/:id/lessons", UserMiddleware ,TeacherMiddleware , CreateLessons );
router.get("/courses/:id/lessons", UserMiddleware ,TeacherMiddleware, ListOfLessons );






export default router ;