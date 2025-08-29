const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Internship=require("../models/internship.js");
const { optionintern, isLoggedIn } = require("../utils/middleware.js");
const Application=require("../models/application.js");
const User=require("../models/user.js");

router.get("/new",isLoggedIn,optionintern,(req,res)=>{
    res.render("company/intern_new.ejs");
});


// internindex
router.get("/",isLoggedIn,wrapAsync(async(req,res)=>{
    let internships = await Internship.find({ owner: req.user._id });
    console.log(internships);
    res.render("company/intern_index.ejs",{internships});
}));


//intern-show
router.get("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const internship=await Internship.findById(id);
    res.render("company/intern_show.ejs",{internship});
}));


//edit-internship
router.get("/:id/new",isLoggedIn,wrapAsync(async(req,res)=>{
    let{id}=req.params;
    const internship=await Internship.findById(id);
    console.log(internship,"edit");
    res.render("company/intern_edit.ejs",{internship});
}));

// update
router.put("/:id",isLoggedIn,wrapAsync(async(req,res)=>{
    let{id}=req.params;
    await Internship.findByIdAndUpdate(id,{...req.body.list});
    req.flash("success","updated!");
    res.redirect(`/company/internship/${id}`);
}));

//delete
router.delete("/:id",isLoggedIn,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Internship.findByIdAndDelete(id);
    req.flash("success","deleted!");
    res.redirect("/company/internship");
}));

//application 
router.get("/application/:id",isLoggedIn,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const application=await Application.find({internshipId:id});
    console.log(application,"ok1");
    const applieds = await Promise.all(
        application.map(async (e) => {
            return await User.findById(e.userId);
        })
    );
    console.log(applieds,"hello1");
    res.render("company/application.ejs",{application ,applieds});
}));


module.exports=router;