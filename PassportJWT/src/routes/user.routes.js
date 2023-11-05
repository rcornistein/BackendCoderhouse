import { Router } from "express";
import {escape} from "querystring"
import passport from "passport";
import { initializePassport } from "../config/passport.config.js";
import { config } from "../config/config.js";
import { generateToken, validateToken } from "../utils.js";
import { createHash, inValidPassword } from "../utils.js";


//import { productsModel } from "../dao/models/product.model.js";

import { userService } from "../dao/index.js";

initializePassport();

const userRouter = Router();




userRouter.get("/fail-login",(req,res)=>{
    res.render("login",{style: 'logIn.css',logError:true ,error:"Log in error. Check user or password"});
});


userRouter.get("/login", (req,res)=>{



        let  data={
            style: 'logIn.css'
        }
        res.render("login",data);
        
  
 });
 

 userRouter.get("/signin", (req,res)=>{



    let  data={
        style: 'signIn.css'
    }
    res.render("signIn",data);
    

});



userRouter.post("/signin"

,async (req,res)=>{

try {
        const loginForm = req.body;
       
        
        const user = await userService.getUserByMail({ email:loginForm.InputEmail});
        if(user){
         //el usuario ya esta registrado

         return res.render("login",{ style: 'logIn.css',logError:true,error:"User already exists"});
      

        
        }
        else{
        const newUser = await userService.createUser({first_name: loginForm.InputName,
            last_name: loginForm.InputLastname,
            age:loginForm.InputAge,
             email:loginForm.InputEmail,
             password: createHash(loginForm.InputPassword )    });
        

        let  data={
            style: 'logIn.css',
            logError:true,error:"User created succesfully. Please Login"
        
        }
        res.render("login",data);
    }
        
    } catch (error) {
        console.log(error.message);
        
    }
    
});




 userRouter.post("/login", async (req,res)=>{

    try {

        const loginForm = req.body;

        const user  = await userService.getUserByMail({email:loginForm.InputEmail});
        if(!user ){
            return res.render("login",{ style: 'logIn.css',logError:true,error:"User doesn't exist"});
       }
       //verificar contraseña
    
       if(!inValidPassword(loginForm.InputPassword,user)){
        return res.render("login",{ style: 'logIn.css',logError:true,error:"Some data doesn't match"});
        }
        const token = generateToken(user);
        res.cookie("cookieToken",token,{httpOnly:true}).redirect("/products");

    
       // res.redirect("/products");

        
    } catch (error) {

        console.log(error.message);
        
    }
 
});


userRouter.get("/current", 
    passport.authenticate("jwtAuth",{session:false}) , (req,res)=>{
        res.json({result:req.user});
});




userRouter.get("/logout", async(req,res)=>{
        try {
            
            res.clearCookie('cookieToken');
          
            res.render("login", {style:"logIn.css"});
            
        } catch (error) {
            res.render("login",{error:"Coudn't log out",style: "logIn.css"});
        }
 });




 userRouter.get("/github", passport.authenticate("signupGithubStrategy",{scope:['user:mail']}),async (req, res)=>{
 
 });
 //ruta del callback con github
 
 userRouter.get(config.github.callbackUrl, passport.authenticate("signupGithubStrategy",{
     failureRedirect:"/api/users/fail-login"
 }), (req,res)=>{
        
                  const token = generateToken(req.user);
                 res.cookie("cookieToken",token,{httpOnly:true}).redirect("/products");
               
    
 });





 export default userRouter;
