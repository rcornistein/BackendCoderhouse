//const fs = require("fs");

import fs from "fs";

export class ProductManager{

    constructor(path){

        this.path=path; 
        if(!fs.existsSync(this.path)){
        fs.writeFileSync(path,"[]");
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
            return contenidoJson;

       }
       else {
        throw new Error("No existe el archivo de Productos");
       }
    }
       catch(error){
            console.log(error.message);
           throw error;

       }
    }

    async addProduct(title,description,price,thumbnail,code,stock){
        try{
        
            let productos=await this.getProducts();


            let precioNegativo=price>0;
            let tittleObj=title!=null||title!=undefined;

            let checkTitle={tittleObj,logError:'el titulo es nulo o vacio'};

            let descriptionObj=description!=null||description!=undefined;
        
            let checkDescriptcion={descriptionObj,logError:'la descripción es nula o vacía'};
            let checkPrice={precioNegativo, logError:'el precio es negativo'}; //lo que quiero que ocurra

            let thumbnailObj=thumbnail!=null||thumbnail!=undefined;
            let checkThumbnail={thumbnailObj,logError:'link nulo'};

            let codeObj=code!=null||code!=undefined;
            let checkCode={codeObj,logError:'código de producto nulo o vacío'};


            let checkStockvalor= stock!=null|| stock!=undefined; 
            let checkStock={checkStockvalor,logError:'valor de Stock no váalido'}

            //el stock podria ser 0 para un producto no disponible en tienda
            let codigoYaExiste=!productos.find(elem=>elem.code==code);
            let checkCodigoYaExiste={codigoYaExiste,logError:'el código de producto ya está asignado'}

            let conditions={checkTitle,checkDescriptcion,checkPrice,checkThumbnail,checkCode,checkStock,checkCodigoYaExiste};

        /* chequeo que el code no este ya en otro producto de la collecion */

            let evalueConditions= Object.values(conditions).reduce( (acum,current)=> acum || !current[Object.keys(current)[0]],false);      

            if(evalueConditions){

                let error=Object.values(conditions).find(elem=>elem[Object.keys(elem)[0]]===false);
                
                console.log(`No se ha podido insertar el producto, el posible motivo es: ${error[Object.keys(error)[1]]}`);
            
            }

            else{
            
                /* asigno un id */
                let id=0;
                if(productos.length>0){
                id=  productos[productos.length-1].id++;
                }
                else{
                    id=1;
                }
                let product= {id,
                    title,
                description,
                price,
                thumbnail,
                code,
                stock};
                productos.push(product);
                await fs.promises.writeFile(this.path,JSON.stringify(productos,null,"\t"));
            }

        }
        catch(error){
            console.log(error.message);
            throw error;
        }

    }

    async getProductById(id){
        try{

            let productos=await this.getProducts();
            let existeId=productos.find(elem=>elem.id===id);
        
            if(existeId){
            return productos.find(elem=>elem.id===id);

                }
            else{
                return(`Product ${id} not found`);
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

                }
            else{
                return(`Product ${id} not found`);
            }


        }
        catch(error){

            console.log(error.message);
            throw error;
        }
    }


    async deleteProduct(id){
        try{

            let productos=await this.getProducts();
            let existeId=productos.find(elem=>elem.id===id);
        
            if(existeId){
                  
           
                
                await  fs.promises.writeFile(this.path,JSON.stringify(productos.filter(elem=>elem.id!=id),null,"\t"));

                }
            else{
                return(`Cannot delete product ${id} because it was not found`);
            }


        }
        catch(error){

            console.log(error.message);
            throw error;
        }
    }




 }


/*
 const  test= async()=>{
    try{
        productos= new ProductManager('./productos.json');
        let listaProductos= await productos.getProducts();
        await productos.addProduct("producto prueba","Este es un producto de prueba",200,"Sin imagen","abc123",25);
        
        await productos.addProduct("producto prueba","Este es un producto de prueba",200,"Sin imagen","abc1234",25);
      
        await productos.updateProduct(1,{title: "nuevo titulo"});
        await productos.deleteProduct(1);
    }
    catch(error){
        throw error;
    }
 }
 test();
*/