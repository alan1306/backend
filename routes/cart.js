const express=require('express')
const router=express.Router();
const courses=require('../data')
const config=require('config');
const jwt=require('jsonwebtoken');
const {User}=require('../models/user')

router.get('/',async(req,res)=>{
    if(req.cookies.jwt){
        const decoded=jwt.verify(req.cookies.jwt,config.get('jwtPrivateKey'));
        const user=await User.findOne({_id:decoded._id})
        return res.send(user.cart)
    }
    res.redirect('/login');
})

module.exports=router;