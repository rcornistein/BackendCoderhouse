import fs from "fs";
import {ProductManager} from "./ProductManager.js";

export class CartManager{


    constructor(path){

        this.path=path; 
       
        
        if(!fs.existsSync(this.path)){
        fs.writeFileSync(path,"[]");
        }
    }

    fileExist(){
        return fs.existsSync(this.path);
    }


    async getCarts(){
        try{
 
         if(this.fileExist()){
             //leer el archivo
             const contenido = await fs.promises.readFile(this.path,"utf-8");
             //transformar string a json => JSON.parse(objetoJson)
             const contenidoJson = JSON.parse(contenido);
             return contenidoJson;
 
        }
        else {
         throw new Error("Shopping Cart file doesn't exist");
        }
     }
        catch(error){
            // console.log(error.message);
            throw error;
 
        }
     }


     async addCart(){
        try{
        
                let carts= await this.getCarts();

                
                /* asigno un id */
               let id=0;
                if(carts.length>0){              
                id= Math.max(...carts.map(prod=>prod.id)) +1}
                else{
                    id=1;
                }

                               
                let newCart= {id,products: []};
                carts.push(newCart);
                await fs.promises.writeFile(this.path,JSON.stringify(carts,null,"\t"));
                return {status:200,message: `Shopping cart added`};
            

        }
        catch(error){
          //  console.log(error.message);
            throw error;
        }

    }



    async getCartById(id){
        try{

            let carts=await this.getCarts();
            let existeId=carts.find(elem=>elem.id===id);
        
            if(existeId){
            return  carts.find(elem=>elem.id===id);
                }
            else{
                return({ status:200,message:`Shopping cart ${id} not found`});
            }

        }
        catch(error){

           // console.log(error.message);
            throw error;
        }
    }

   

    async deleteProductFromCart(cid,pid){

        //validar que las propiedas son las definidas
        try{

            let carts=await this.getCarts();
            let cart= carts.find(cartitem => cartitem.id=== cid);
            let currentProducts= new ProductManager('./src/productos.json');
           
            // chequeo si el producto existe en el inventario
          
            let existprodPid=await currentProducts.getProductById(pid);
           
          
            if (cart && !existprodPid.message) {
             
              if(cart.products){  
                    let cartCid= cart.products;
                    let prodPid= cartCid.find(prod=>prod.id===pid);
                    if(prodPid){
                        if(prodPid.quantity>1)
                        { 
                            prodPid.quantity=prodPid.quantity-1 ;
                            cart.products=cartCid.filter(prod=>prod.id!=pid);
                            cart.products.push(prodPid);
                        }
                        else{
                        cart.products=cartCid.filter(prod=>prod.id!=pid);
                        }    
                        
                    }
                    else {
                        return({status: 200,message: `Cart ${cid} has no product ${pid}`})
                    }
                    
                    
                }
                else{
                    return({status: 200,message: `Cart ${cid} has no products`});

                }

                let newCart= carts.map(elem=>{
                    if(elem.id===cid){
                        return cart
                    } 
                        else{ 
                            return elem
                        }
                    })
                    

                await fs.promises.writeFile(this.path,JSON.stringify(newCart,null,"\t"));
                return({status: 200,message: `One unit of product ${pid} deleted from Cart ${cid}`});

            }
            else{
                if(!cart){
                return ({status: 200,message:`Cart ${cid} not found` })
                }
                if(existprodPid.message){
                    return ({status: 200,message: existprodPid.message })
                    }

            }

        }
        catch(error){

            //console.log(error.message);
            throw error;
        }
    }


    async addProductToCart(cid,pid){

        //validar que las propiedas son las definidas
        try{

            let carts=await this.getCarts();
            let cart= carts.find(cartitem => cartitem.id=== cid);
            let currentProducts= new ProductManager('./src/productos.json');
           
            // chequeo si el producto existe en el inventario
          
            let existprodPid=await currentProducts.getProductById(pid);
            
          
            if (cart && !existprodPid.message) {
             
              if(cart.products){  
                    let cartCid= cart.products;
                    let prodPid= cartCid.find(prod=>prod.id===pid);
                    if(prodPid){
                        ++prodPid.quantity;
                        cart.products=cartCid.filter(prod=>prod.id!=pid);
                        cart.products.push(prodPid);
                        
                    }
                    else{
                        cart.products.push({id: pid,quantity:1});

                    }
                    
                }
                else{
                    cart.products=[{id: pid,quantity:1}]

                }

                let newCart= carts.map(elem=>{
                    if(elem.id===cid){
                        return cart
                    } 
                        else{ 
                            return elem
                        }
                    })
                    

                await fs.promises.writeFile(this.path,JSON.stringify(newCart,null,"\t"));
                return({status: 200,message: `Product ${pid} added to Cart ${cid}`});

            }
            else{
                if(!cart){
                return ({status: 200,message:`Cart ${cid} not found` })
                }
                if(existprodPid.message){
                    return ({status: 200,message: existprodPid.message })
                    }

            }

        }
        catch(error){

            //console.log(error.message);
            throw error;
        }
    }




}

export default CartManager;