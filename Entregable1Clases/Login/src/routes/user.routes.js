import { Router } from "express";
import {escape} from "querystring"

//import { productsModel } from "../dao/models/product.model.js";

import { userService } from "../dao/index.js";


const userRouter = Router();


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



userRouter.post("/signin", async (req,res)=>{


    try {
        const loginForm = req.body;
       
        
      
     
        const email = await userService.createUser({email:loginForm.InputEmail,password: loginForm.InputPassword    });
        

        let  data={
            style: 'logIn.css'
        
        }
        res.render("login",data);
        
    } catch (error) {
        console.log(error.message);
        
    }
  
    

});


 userRouter.post("/", async (req,res)=>{

    try {
        const loginForm = req.body;
 
        const email = await userService.createUser({email:loginForm.InputEmail,password: loginForm.InputPassword});


        res.status(200).send({message:" user created"}); 
        
    } catch (error) {
        

        console.log(error.message);
    }

 })

 userRouter.post("/login", async (req,res)=>{

    try {

        const loginForm = req.body;
       
        if(loginForm.InputEmail==='adminCoder@coder.com' && loginForm.InputPassword==='adminCod3r123'){
            req.session.email = 'adminCoder@coder.com'
            req.session.rol='admin';

        }else{
        const email = await userService.getUserByMail({email:loginForm.InputEmail});
             if(!email){
                 return res.render("login",{ style: 'logIn.css',logError:true,error:"User doesn't exist"});
            }
        //verificar contraseña
            if(email.password !== loginForm.InputPassword){
            return res.render("login",{ style: 'logIn.css',logError:true,error:"Some data doesn't match"});
            }
        //ususario existe y contraseña valida, entonces creamos la session del usuario
            req.session.email = email.email;
            req.session.rol=email.rol;
         }
        res.redirect("/products");

        
    } catch (error) {

        console.log(error.message);
        
    }


    userRouter.get("/logout", async(req,res)=>{
        try {
            req.session.destroy(err=>{
                if(err) {return res.render("login",{error:"Coudn't log out", style:"logIn.css"})};
                res.render("login", {style:"logIn.css"});
            })
        } catch (error) {
            res.render("login",{error:"Coudn't log out",style: "logIn.css"});
        }
    });

    

});





 export default userRouter;
