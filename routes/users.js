const express=require('express');
const {User,validate}=require('../models/user');
const mongoose=require('mongoose');
const _=require('lodash');
const router=express.Router();
const bcrypt=require('bcrypt');
const Joi=require('joi');

router.post('/',async(req,res)=>{
    const {error}=validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let user=await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('User already exist');
    user=new User(_.pick(req.body,['name','email','password']));
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password,salt);
    await user.save();
    res.redirect('/');
    
});

module.exports=router;