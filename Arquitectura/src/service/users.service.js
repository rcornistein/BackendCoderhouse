import { usersDao } from "../dao/index.js";

export class UsersService{
    static createUser(object){
        return usersDao.createUser(object);
    };

    static getUserByMail(object){
        return usersDao.getUserByMail(object);
    };



}