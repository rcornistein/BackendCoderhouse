import { usersDao,cartsDao } from "../dao/factory.js";
import { CurrentUserDTO } from "../dao/DTOs/users.dto.js";

export class UsersService{
    static createUser(object){
        return usersDao.createUser(object);
    };

    static getUserByMail(object){
      
        return usersDao.getUserByMail(object);
    };

    static getUsers(){
      
        return usersDao.getUsers();
    };


    static sendCurrentUser(req){
       
        return new CurrentUserDTO(req.user)}

    static async updateCidToUser(id){

        const cartId=  await cartsDao.createCart();
       
        const user=usersDao.updateUser(id,{cart: cartId._id.toString()});
        return user
        
        
        }
    
        static async updatePasswordToUser(id,password){

          
         
            const user=usersDao.updateUser(id,{password: password});
            return user
            
            
            }
    
        static async updateRoleToUser(id,role){

          
         
                const user=usersDao.updateUser(id,{role: role});
                return user
                
                
                }

}

