const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Job=require("../models/job.js");
const Internship=require("../models/internship.js");
const { optioncompany } = require("../utils/middleware.js");
const Application = require("../models/application.js");


router.get("/",(req,res)=>{
    res.render("company.ejs");
});

//create new
router.post("/",wrapAsync(async(req,res)=>{
    const list=req.body.list;
    if(req.session.listingtype==="internship"){
        let intern=new Internship(list);
        intern.owner=req.user;
        const result = await intern.save();
        console.log(result);
    }
    if(req.session.listingtype==="job"){
        let job=new Job(list);
        job.owner=req.user;
        const result = await job.save();
        console.log(result);
    }
    res.redirect("/company");
}));

router.post("/application/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let application=await Application.findById(id);
    application.Status='Accepted';
    application.save();
    console.log(application,'application');
    if(application.internshipId){
        const Aid=application.internshipId;
        res.redirect(`/company/internship/application/${Aid}`);
    }else{
        const Aid=application.jobId;
        res.redirect(`/company/job/application/${Aid}`);
    }
}));

//signup
router.get("/signup",optioncompany,(req,res)=>{
    res.render("signup.ejs");
});

module.exports=router;