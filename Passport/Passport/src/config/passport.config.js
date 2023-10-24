import passport from "passport";
import localStrategy from "passport-local";
import { createHash, inValidPassword } from "../utils.js";
import { userModel } from "../dao/models/user.model.js";
import {config} from "./config.js";
import GithubStrategy from "passport-github2";
import { userManagerMongo } from "../dao/mongo/userManagerMongo.js";

import { userService } from "../dao/index.js";





//localStrategy: username y password
export const initializePassport = ()=>{
    //Estrategia para registrar a los usuarios
    passport.use("signupLocalStrategy", new localStrategy(
        {
            passReqToCallback:true,
            usernameField:"InputEmail", //ahora el campo username es igual al campo email
            passwordField: "InputPassword"
        },
        async (req,username,password,done)=>{
          
            try {

              
                    const user = await userService.getUserByMail({email:username});
                    if(user){
                     //el usuario ya esta registrado
                     return done(null,false);
                    }
                    //El usuario no esta registrado
                    const newUser = {
                        email:username,
                     password:createHash(password)
                    };
                    
                    const userCreated =  await userService.createUser(newUser);
                    return done(null,userCreated);
            
            } catch (error) {
                return done(error);
            }
        }
    ));

    //Estrategia para login a los usuarios
passport.use("loginLocalStrategy", new localStrategy(

        {
          
            usernameField:"InputEmail", //ahora el campo username es igual al campo email
            passwordField: "InputPassword"
           
        },
        async (username,password,done)=>{
            try {
                
                if(username==='adminCoder@coder.com' && password==='adminCod3r123')
                {
                    const newUser = {
                        email:username,
                        rol:'admin',
                        _id:1
                    };
                    
                    return done(null,newUser);
                }
                else{
                const user = await userService.getUserByMail({email:username});
           
              
                if(!user){
                    //el usuario no esta registrado
                    return done(null,false);
                }
                if(!inValidPassword(password,user)){
               
                    return done(null,false);
                }
                //validamos que el usuario esta registrado y que la contraseña es correcta
                return done(null,user);
            }
            } catch (error) {
                return done(error);
            }
        }
    ));

    //Estrategia de registro con github
    passport.use("signupGithubStrategy", new GithubStrategy(
      
        {
            clientID: config.github.clientId,
            clientSecret: config.github.clientSecret,
            callbackURL: `http://localhost:8080/api/users${config.github.callbackUrl}`
           
        },
        async(accessToken,refreshToken,profile,done)=>{
            try {
         
               
                const user = await userService.getUserByMail({email:profile.username});
                if(user){
                    //el usuario ya esta registrado
                    return done(null,user);
                }
                //El usuario no esta registrado
                const newUser = {
                    email:profile.username,
                    password:''
                };
                console.log(newUser);
                const userCreated = await userService.createUser(newUser);
                return done(null,userCreated);
            } catch (error) {
                return done(error)
            }
        }
    ));

    passport.serializeUser((user,done)=>{
        done(null, user._id);
    });

    passport.deserializeUser(async(id,done)=>{
        if(id !=1){
        const user = await userModel.findById(id);
        done(null,user)}//req.user = informacion del usuario que traemos de la base de datos
        else{
            done(null,user);
        }
    });
};