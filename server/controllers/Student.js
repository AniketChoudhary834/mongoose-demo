import Departments from "../models/Departments.js";
import Student from "../models/Student.js";

export async function getStudents(req,res){
    try {
        console.log('./api call at getstudents');
        const {search,sort="name-asc",limit=5,page=1} = req.query;

        const filter = search ?{
            $or:[
                {name:{$regex: search , $options : "i"}},
                {email:{$regex: search , $options : "i"}}
            ]
        } : {};

        const sortOptions = {
            "name-asc": { name:1},
            "name-desc": { name:-1},
            "age-asc": { age:1},
            "age-desc": { age:-1}
        }

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber-1) * limitNumber;

        const students = await Student.find(filter)
        .populate("department","department_name")
        .sort(sortOptions[sort] || {})
        .skip(skip)
        .limit(limitNumber);

        const totalStudents = await Student.countDocuments(filter);
        const totalPages = Math.ceil(totalStudents/limitNumber);


        res.json({
            success:true,
            students,
            totalPages,
            currentPage: pageNumber
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}



// export async function getStudents(req,res){
//     try {
//         const {search} = req.query;

//         const filter = search ?{
//             $or:[
//                 {name:{$regex: search , $options : "i"}},
//                 {email:{$regex: search , $options : "i"}}
//             ]
//         } : {};

//         // const students = await Student.find().populate("department","department_name code");
//         // const students = await Student.find().populate("department","department_name");
//         const students = await Student.find(filter).populate("department","department_name");
        
//         res.json({
//             success:true,
//             data : students
//         });

//     } catch (error) {
//         res.status(500).json({
//             success:false,
//             message:error.message
//         });
//     }
// }

export async function createStudent(req,res){
    try {
        const {name , email , age , department} = req.body;
        // validation 
        const student = await Student.create({name , email , age , department});
        const dept = await Departments.findById(department);
        dept.students.push(student._id);
        await dept.save();
        console.log(dept);
        res.json({
            success:true,
            message : "Student Created Successfully"
        });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
export async function deleteStudent(req,res){
    try {
        const id = req.params.id;
        // validations 
        await Student.findByIdAndDelete(id);
        res.json({
            success:true,
            message : `Student(${id}) Deleted Successfully`
        });
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}