import Departments from "../models/Departments.js";

// export async function getDepartments(req,res){
//     try {
//         const departments = await Departments.find();
//         // console.log(departments);
//         res.json({
//             success:true,
//             data:departments
//         });
        
//     } catch (error) {
//         res.status(500).json({
//             success:false,
//             message:error.message
//         });
//     }
// }

export async function getDepartments(req,res){
    try {
        const query = req.query;
        
        const filter = query.search ? {
            $or:[
                {department_name:{ $regex : query.search, $options : "i"}},
                {code:{ $regex : query.search, $options : "i"}}
            ]
        } : {};

        // const departments = await Departments.find({department_name:query.name});  // exact match
        const departments = await Departments.find(filter);
        // console.log(departments);
        res.json({
            success:true,
            data:departments
        });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}


export async function getDepartmentDetails(req,res){
    try {
        const id = req.params.id;
        // validate
        const departmentDetails = await Departments.findById(id).populate("students","name email age");
        // console.log(departmentDetails);
        res.json({
            success:true,
            data:departmentDetails
        });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}


export async function createDepartment(req,res){
    try {
        const {department_name , code} =req.body;
        console.log(req.body);
        // validations
        await Departments.create({department_name , code});
        res.json({
            success:true,
            message:"Department Created"
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}


export async function deleteDepartment(req,res){
    try {
        const id = req.params.id;
        await Departments.findByIdAndDelete(id);
        res.json({
            success:true,
            message:`Department with id ${id} | Deleted Successfully`
        });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}