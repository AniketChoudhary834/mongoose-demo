import mongoose, { mongo } from "mongoose";

const departmentSchema = new mongoose.Schema({
    department_name: {
        type:String,
        required : true,
        unique: true
    },
    code : {
        type:String,
        required : true,
        unique: true
    },
    students: [{
        type:mongoose.Schema.Types.ObjectId ,
        ref : "Student"
    }]
});


export default mongoose.model("Department",departmentSchema);