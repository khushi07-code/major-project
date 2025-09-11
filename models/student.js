const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema= new Schema({
    studentId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["female","male","other"]
    },
    address:{
        type:String
    },
    college: {
        type:String
    },
    course:{
        type:String
    },
    branch:{
        type:String
    },
    semester:{
        type:Number,
        min:1,
        max:8
    },
    skills:{
        type:[String]
    },
    resumeUrl:{
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Student=mongoose.model("student",studentSchema);
module.exports=Student;
 

