const express=require('express');
const {User}=require('../models/user')
const mongoose=require('mongoose')
const router=express.Router();
const Joi=require('joi');
const bcrypt=require('bcrypt');
const _=require('lodash');
const jwt=require('jsonwebtoken');
const config=require('config');
router.post('/',async(req,res)=>{
    const {error} =validate(req.body)
    if(error) return res.status(400).send("invalid format")
    const user=await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("User doesnt exist");
    const validPassword=await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send("User doesnt exist")
    const token=jwt.sign({_id:user._id},config.get('jwtPrivateKey'));
    res.cookie("jwt",token,{
        expires:new Date(Date.now()+5000000),
        httpOnly:true
    });
    res.redirect('/')

});

function validate(req){
    const schema={
        email:Joi.string().min(5).max(120).email().required(),
        password:Joi.string().min(5).max(200).required(),
    };
    return Joi.validate(req,schema);
}

module.exports=router;