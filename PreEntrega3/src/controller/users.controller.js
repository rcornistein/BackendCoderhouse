import { UsersService } from "../service/users.service.js";
import { Router } from "express";
import {escape} from "querystring"
import passport from "passport";
import { initializePassport } from "../config/passport.config.js";
import { config } from "../config/config.js";
import { generateToken, validateToken } from "../utils.js";
import { createHash, inValidPassword } from "../utils.js";
import { CurrentUserDTO } from "../dao/DTOs/users.dto.js";
import { compareSync } from "bcrypt";


export class UsersController{

    static getFailLogin = async(req,res)=>{

        
        res.render("login",{style: 'logIn.css',logError:true ,error:"Log in error. Check user or password"});
    };
   

    static getLogin = (req,res)=>{



        let  data={
            style: 'logIn.css'
        }
        res.render("login",data);}


    

    static getSignin = (req,res)=>{



            let  data={
                style: 'signIn.css'
            }
            res.render("signIn",data);}
        
     
static postLogin = async (req,res)=>{

    try {

        const loginForm = req.body;
        let userFin;
        let userFin2;

        //console.log(loginForm.InputEmail,config.admin.email,loginForm.InputPassword,config.admin.password)

     
        if(loginForm.InputEmail.trim()==config.admin.email && loginForm.InputPassword.trim()===config.admin.password){
         
           
            
             userFin=

            {   first_name:'CoderAdmin',
                last_name:'CoderAdmin',
                age: 0,
                email:'admin@coder.com',
                cart: null,
                role: 'admin'
            }

          

        }
        else  {
           
                let email={};
               
                email.email=loginForm.InputEmail;
                let user  = await UsersService.getUserByMail(email);

              
               
                if(!user ){
                     return res.render("login",{ style: 'logIn.css',logError:true,error:"User doesn't exist"});
                }
             //verificar contraseña

                
                 userFin=user[0];
                 
                 const userId=userFin._id.toString()
           
                 userFin= await UsersService.updateCidToUser(userId);

                 let emailUser={};
               
                 emailUser.email=loginForm.InputEmail;
                 userFin=await UsersService.getUserByMail(emailUser);
                  userFin2=userFin[0]
                
               
             
                 if(!inValidPassword(loginForm.InputPassword,userFin2)){
                return res.render("login",{ style: 'logIn.css',logError:true,error:"Some data doesn't match"});
                }
            }

       
        const token = generateToken(userFin2);

            
        res.cookie("cookieToken",token,{httpOnly:true}).cookie("cartId",userFin2.cart.toString()).redirect("/products");

    
       // res.redirect("/products");

        
    } catch (error) {

        console.log(error.message);
        
    }
 
}




    static postSignin = async (req,res)=>{

        try {
                const loginForm = req.body;
               
                

                
                const user = await UsersService.getUserByMail({ email:loginForm.InputEmail});
                if(user){
                 //el usuario ya esta registrado
        
                 return res.render("login",{ style: 'logIn.css',logError:true,error:"User already exists"});
              
        
                
                }
                else{
                const newUser = await UsersService.createUser({first_name: loginForm.InputName,
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
    }

    static getCurrent =    (req,res)=>{
        
        res.json({result: UsersService.sendCurrentUser(req) /*new CurrentUserDTO(req.user)*/});
    }

    static getLogout = async(req,res)=>{
        try {
            
            res.clearCookie('cookieToken');

            res.clearCookie('products');
            res.clearCookie('cartId');
            res.render("login", {style:"logIn.css"});
            
        } catch (error) {
            res.render("login",{error:"Coudn't log out",style: "logIn.css"});
        }
 }


 static getGithub =(req,res)=>{
    
    const token = generateToken(req.user);

   
   res.cookie("cookieToken",token,{httpOnly:true}).cookie("cartId",req.user.cart.toString()).redirect("/products");
 

}
 


};
