class ProductManager{
    constructor(){
        this.products=[];
    }

    addProduct(title,description,price,thumbnail,code,stock){

        /* chequeos de variables de entrada */
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
        let codigoYaExiste=!this.products.find(elem=>elem.code==code);
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
                if(this.products.length>0){
                id=  this.products[this.products.length-1].id++;
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
                    this.products.push(product);
            }



    }

    getProducts(){
        return this.products;
    }
    getProductById(id){

        let existeId=this.products.find(elem=>elem.id===id);
        if(existeId){
            return this.products.find(elem=>elem.id===id);

        }
        else{
                console.log(`Product ${id} not found`);
        }
    }

}

/* testing

let productManager1= new ProductManager();
console.log(productManager1.getProducts());

productManager1.addProduct('producto prueba',"Este es un producto prueba",200,"sin imagen","abc123",25);
console.log(productManager1.getProducts());
productManager1.addProduct('producto prueba2',"Este es un producto prueba",200,"sin imagen","abc123",25);

productManager1.addProduct("titulo","desc",-3,"/foto2","aaa1",1);

productManager1.addProduct(null,"desc",3,"aaa1","aaa1",1);

productManager1.getProducts();
console.log('producto por id',productManager1.getProductById(100));

*/


