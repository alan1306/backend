const helmet=require('helmet');
const compression=require('compression');
const config=require('config');
const express=require('express');
const path=require('path')
const hbs=require("hbs");
const app=express();
const courses=require('./data')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const viewsPath=path.join(__dirname,'/templates/views')
const partialsPath=path.join(__dirname,'/templates/partials')
const users=require('./routes/users');
const login=require('./routes/login');
const addToCart=require('./routes/addToCart');
const cart=require('./routes/cart');
if(!config.get('jwtPrivateKey')){
    console.error("FATAL ERROR jwt token not defined");
    process.exit(1);
}
mongoose.connect('mongodb://localhost/EduLearn')
    .then(()=>console.log('connectes to database'))
    .catch(err =>console.log('error connecting',err))
app.use(express.static('public'));
app.use(cookieParser());
app.set("view engine","hbs");
app.set("views",viewsPath);
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(helmet());
app.use(compression());
hbs.registerPartials(partialsPath);

app.get('/',(req,res)=>{
    res.render("index",{
        product:courses.products,token:req.cookies.jwt
    });
});

app.get('/login',(req,res)=>{
    res.render("login");
});
app.get('/logout',(req,res)=>{
    res.clearCookie("jwt");
    res.redirect('/')
});
app.get('/register',(req,res)=>{
    res.render("register");
});
app.use('/api/users',users);
app.use('/api/loginUser',login);
app.use('/api/add-to-cart',addToCart);
app.use('/cart',cart);
const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening to ${port}`))
