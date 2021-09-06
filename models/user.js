const Joi=require('joi')
const mongoose=require('mongoose')

const User=mongoose.model('User',new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50,
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:100,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024,
    },
    cart:[String]
}));

function validateUser(user){
    const schema={
        name:Joi.string().min(5).max(50).required(),
        email:Joi.string().min(5).max(120).email().required(),
        password:Joi.string().min(5).max(200).required(),
        confirmPassword:Joi.string().required().valid(Joi.ref('password'))
    };
    return Joi.validate(user,schema);
}

exports.User=User;
exports.validate=validateUser;