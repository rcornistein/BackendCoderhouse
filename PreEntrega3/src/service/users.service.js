import { usersDao } from "../dao/factory.js";
import { CurrentUserDTO } from "../dao/DTOs/users.dto.js";

export class UsersService{
    static createUser(object){
        return usersDao.createUser(object);
    };

    static getUserByMail(object){
      
        return usersDao.getUserByMail(object);
    };

    static sendCurrentUser(req){
       
        return new CurrentUserDTO(req.user)}
    

}