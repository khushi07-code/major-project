const mongoose=require("mongoose");
const {Schema}=mongoose;

const intershipSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirement:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    internshiptype:{
        type:String,
        required:true,
        default:"unpaid"
    },
    stipend:{
        type:Number,
        default:0,
    },
    duration:{
        type:Number,
        default:1
    },
    openings:{
        type:Number,
        default:1,
    },
    listingtype: {
        type: String,
        default:"internship"
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    postedAt:{
        type:Date,
        default: Date.now(),
    },
});

const Internship=mongoose.model("internship",intershipSchema);


module.exports=Internship;
