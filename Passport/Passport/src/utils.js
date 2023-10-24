import path from 'path';
import { fileURLToPath } from 'url';
import multer from "multer";
import bcrypt from "bcrypt";


export const __dirname = path.dirname(fileURLToPath(import.meta.url));
// console.log("dirname: ", __dirname);


 const storage = multer.diskStorage({
    //destination:carpeta donde se guardan los archivos
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"/public/images"))
    },

    // filename:con que nombre vamos a guardar el archivo
    filename:function(req,file,cb){
        
        cb(null,`${req.body.code}-${file.originalname}`)
    }
});


export const createHash = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync());
};

export const inValidPassword = (password,user)=>{
    return bcrypt.compareSync(password,user.password);
};


export const uploader = multer({storage});