import mongoose, { mongo } from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type:String,
        required : true
    },
    email : {
        type:String,
        required : true,
        unique: true
    },
    age : {
        type:Number,
        required : true
    },
    department:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required : true
    }
});


export default mongoose.model("Student",studentSchema);