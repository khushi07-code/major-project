const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Job=require("../models/job.js");
const Internship=require("../models/internship.js");
const { optionstudent } = require("../utils/middleware.js");
const Application=require("../models/application.js");
const Company=require("../models/company.js");

router.get("/",wrapAsync(async(req,res)=>{
    const internships=await Internship.find({});
    const jobs=await Job.find({});
    res.render("student.ejs",{internships,jobs});
}));

router.get("/myapplication",async(req,res)=>{
    let applications=await Application.find({userId:req.user._id})
    console.log(applications);
    let requestlist = await Promise.all(
    applications.map(async (e) => {
            if(e.internshipId){
                return await Internship.findById(e.internshipId);
            }else{
                return await Job.findById(e.jobId);
            }
    }));
    let internjobCompanylist = await Promise.all(
        applications.map(async (e) => {
            let companyid;
            if(e.internshipId){
                let internship=await Internship.findById(e.internshipId);
                companyid=internship.owner;
            }else{
                let job=await Job.findById(e.jobId);
                companyid=job.owner;
            }
           let company =await Company.find({companyId:companyid});
           return company;
       }));
    internjobCompanylist = internjobCompanylist.flat();
    requestlist=requestlist.flat();
    res.render("forstudent/application.ejs",{applications,requestlist,internjobCompanylist});
});


router.get("/signup",optionstudent,(req,res)=>{
    res.render("signup.ejs");
});

module.exports=router;