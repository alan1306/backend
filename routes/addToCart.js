const express=require('express')
const router=express.Router();
const courses=require('../data')
const config=require('config');
const jwt=require('jsonwebtoken');
const {User}=require('../models/user')

router.post('/',async(req,res)=>{
    if(req.cookies.jwt){
        const decoded=jwt.verify(req.cookies.jwt,config.get('jwtPrivateKey'));
        const user=await User.findOne({_id:decoded._id})
        console.log(decoded._id,req.body);
        course=courses.products.find(course =>course._id==req.body._id)
        user.cart.push(JSON.stringify(course))
        await  user.save()
        return res.redirect('/')
    }
    res.redirect('/login');
})

module.exports=router;