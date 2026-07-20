import express from "express";
import Departments from "../models/Departments.js";
import { createDepartment, deleteDepartment, getDepartments , getDepartmentDetails} from "../controllers/Department.js";

const router = express.Router();

// "/" (get)  => fetch all departments
// "/" (post) => create new department
// "/id" (delete) => delete specific department

router.get("/",getDepartments);
router.get("/:id",getDepartmentDetails);
router.post("/",createDepartment)
router.delete("/:id",deleteDepartment)


export default router;