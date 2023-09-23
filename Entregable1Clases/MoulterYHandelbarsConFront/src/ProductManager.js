//const fs = require("fs");

import fs from "fs";

export class ProductManager{
   
    constructor(path){

        this.path=path; 
        this.products=[];       
        
        if(!fs.existsSync(this.path)){
        fs.writeFileSync(path,JSON.stringify(this.products,null,"\t"));
        }
       
    }



    fileExist(){
        return fs.existsSync(this.path);
    }


    async getProducts(){
       try{

        if(this.fileExist()){
            //leer el archivo
            const contenido = await fs.promises.readFile(this.path,"utf-8");
            //transformar string a json => JSON.parse(objetoJson)
            const contenidoJson = JSON.parse(contenido);
            this.products=contenidoJson;
            return contenidoJson;

       }
       else {
            return("Product file doesn't exist");
       }
    }
       catch(error){
            console.log(error.message);
           throw error;

       }
    }

    async addProduct(title,description,price,thumbnail,code,stock,status=true,category){
        try{
        
            let productos=await this.getProducts();


            let precioNegativo=price>0;
            let tittleObj=title!=null||title!=undefined;

            let checkTitle={tittleObj,logError:'null or undefined tittle'};

            let descriptionObj=description!=null||description!=undefined;
        
            let checkDescriptcion={descriptionObj,logError:'null or undefined description'};
            let checkPrice={precioNegativo, logError:'negative price'}; //lo que quiero que ocurra

            let categorylObj=category!=null||category!=undefined;
            let checkCategory={categorylObj,logError:'null or undefined category'};

            let codeObj=code!=null||code!=undefined;
            let checkCode={codeObj,logError:'null or undefined code'};


            let checkStockvalor= stock!=null|| stock!=undefined; 
            let checkStock={checkStockvalor,logError:'null or undefined stock'}

            //el stock podria ser 0 para un producto no disponible en tienda
            let codigoYaExiste=!productos.find(elem=>elem.code==code);
            let checkCodigoYaExiste={codigoYaExiste,logError:'code product already assigned'}

            let conditions={checkTitle,checkDescriptcion,checkPrice,checkCode,checkStock,checkCodigoYaExiste,checkCategory};

        /* chequeo que el code no este ya en otro producto de la collecion */

            let evalueConditions= Object.values(conditions).reduce( (acum,current)=> acum || !current[Object.keys(current)[0]],false);      

            if(evalueConditions){

                let error=Object.values(conditions).find(elem=>elem[Object.keys(elem)[0]]===false);
                
               // console.log(`No se ha podido insertar el producto, el posible motivo es: ${error[Object.keys(error)[1]]}`);
                return {status:200,message: `Product not added: ${error[Object.keys(error)[1]]}`};
            
            }

            else{
            
                /* asigno un id */
               let id=0;
                if(productos.length>0){              
                id= Math.max(...productos.map(prod=>prod.id)) +1}
                else{
                    id=1;
                }

                               
                let product= {id,
                    title,
                description,
                price,
                thumbnail,
                code,
                stock,
                status,
                category};
                productos.push(product);
                this.products=productos;
                await fs.promises.writeFile(this.path,JSON.stringify(productos,null,"\t"));
                return {status:200,message: `Product added`};
            }

        }
        catch(error){
          //  console.log(error.message);
            throw error;
        }

    }

    async getProductById(id){
        try{

            let productos=await this.getProducts();
            let existeId=productos.find(elem=>elem.id===id);
        
            if(existeId){
            return  productos.find(elem=>elem.id===id);

                }
            else{
                return({ status:200,message:`Product ${id} not found`});
            }


        }
        catch(error){

            console.log(error.message);
            throw error;
        }
    }

    async updateProduct(id,newProperties){

        //validar que las propiedas son las definidas
        try{

            let productos=await this.getProducts();
           
            let existeId=productos.find(elem=>elem.id===id);
        
            if(existeId){
                let productId= productos.find(elem=>elem.id===id);
               // const {title,description,price,thumbnail,code,stock}=newProperties;
                let newPropertiesKeys=Object.keys(newProperties);
                newPropertiesKeys.forEach(elem=>{
                    productId[elem]=newProperties[elem];

                } );
                let newProductos=productos.map(elem=>{
                    if(elem.id!=id){
                        return(elem);
                    }
                    else{
                        return(productId);
                    }
                })
                await  fs.promises.writeFile(this.path,JSON.stringify(newProductos,null,"\t"));
                return({status:200,message:`Product ${id} updated`});

                }
            else{
                return({status:200,message:`Product ${id} not found`});
            }


        }
        catch(error){

            //console.log(error.message);
            throw error;
        }
    }


    async deleteProduct(id){
        try{

            let productos=await this.getProducts();
            let existeId=productos.find(elem=>elem.id===id);
        
            if(existeId){
                  
           
                
                await  fs.promises.writeFile(this.path,JSON.stringify(productos.filter(elem=>elem.id!=id),null,"\t"));
                return({status:200,message:"Product deleted"})

                }
            else{
                return({status:200, message:`Cannot delete product ${id} because it was not found`});
            }


        }
        catch(error){

            console.log(error.message);
            throw error;
        }
    }




 }

 export default ProductManager;

