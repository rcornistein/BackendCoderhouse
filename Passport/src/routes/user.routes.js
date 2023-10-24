import { Router } from "express";
import {escape} from "querystring"
import passport from "passport";
import { initializePassport } from "../config/passport.config.js";
import { config } from "../config/config.js";

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



userRouter.post("/signin", 
passport.authenticate("signupLocalStrategy",{
    failureRedirect:"/api/users/fail-signup"
})
,async (req,res)=>{


    try {
      //  const loginForm = req.body;
           
//        const email = await userService.createUser({email:loginForm.InputEmail,password: loginForm.InputPassword    });
         

        let  data={
            style: 'logIn.css'
        
        }
        res.render("login",data);
        
    } catch (error) {
        console.log(error.message);
        
    }
    
});




 userRouter.post("/login", passport.authenticate("loginLocalStrategy",{
    failureRedirect:"/api/users/fail-login"
}), async (req,res)=>{

    try {

        req.session.email = req.user.email;
        req.session.rol=req.user.rol;
        res.redirect("/products");

        
    } catch (error) {

        console.log(error.message);
        
    }
 
});

userRouter.post("/fail-login", passport.authenticate("loginLocalStrategy",{
    failureRedirect:"/api/users/fail-login"
}), async (req,res)=>{

    try {

        req.session.email = req.user.email;
        req.session.rol=req.user.rol;
        res.redirect("/products");

        
    } catch (error) {

        console.log(error.message);
        
    }
 
});


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


userRouter.get("/github", passport.authenticate("signupGithubStrategy",{scope:['user:mail']}),async (req, res)=>{
 
});
//ruta del callback con github

userRouter.get(config.github.callbackUrl, passport.authenticate("signupGithubStrategy",{
    failureRedirect:"/api/users/fail-login"
}), (req,res)=>{
    req.session.email = req.user.email;
    req.session.rol=req.user.rol;
    res.redirect("/products");
});
    








 export default userRouter;
