const mongoose = require('mongoose');
const { Schema } = mongoose;


const companySchema=new Schema({
    companyId:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    companyname:{
        type:String,
        required:true
    },
    companyDetails:{
        type:String,
        required:true
    },
    typeOf:{
        type:String,
        required:true
    }
});


const Company=mongoose.model("company",companySchema);
module.exports=Company;