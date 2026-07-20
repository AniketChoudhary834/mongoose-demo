import express from "express";
import { createStudent, deleteStudent, getStudents } from "../controllers/Student.js";

const router = express.Router();

// "/" (get)  => fetch all students
// "/" (post) => create new student
// "/id" (delete) => delete specific student
// "/id" (update) => update specific student

router.get("/",getStudents);
router.post("/",createStudent)
router.delete("/:id",deleteStudent)


export default router;