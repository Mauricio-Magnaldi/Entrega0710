import fs from 'fs';

class CartsManager{

        constructor(path){
            this.path = path;
        }

        async getProductsOnCart(queryObject){
            try{
                if(fs.existsSync(this.path)) {
                    const productsOnFile = await fs.promises.readFile(this.path,"utf-8");
                    const products = JSON.parse(productsOnFile);                     
                    return products;
                } else {
                    return [];       
                }
            } catch (error) {
                return error;
            }
        }

        async addProductToCart(object){
            try {     
                    const products = await this.getProductsOnCart({});
                    const index = products.findIndex((product) => product.idProductOnCart === +object.idProductOnCart);
                    if ( index !== -1 ) {
                                console.log(`El producto ${products[index].idProductOnCart} ya se encuentra en el carrito.`);
                                products[index].quantityProductOnCart += +object.quantityProductOnCart;                                 
                            } else {
                                console.log(`El producto ${object.idProductOnCart} no existe en el carrito.`);
                                let id;
                                if(!products.length) {
                                        id = 1;
                                    } else {
                                        id = products[products.length - 1].id+1;
                                }
                            const newProduct = {id, ...object};
                            products.push(newProduct);
                    }
                    await fs.promises.writeFile(this.path, JSON.stringify (products));
                    return products;                            
                } catch (error) {
                    return error;
                }
            }

        async getProductFromCartById(productId){
            try {    
                const products = await this.getProductsOnCart({});
                const product = products.find(product => product.id === productId);
                return product;
            } catch (error) {
                return error;
            }
        }
    // la ruta POST /:cid/product/:pid deberá agregar el producto al arreglo products del carrito seleccionado bajo el siguiente formato:
    async updateCart(cartId, productId, quantity){
        //products SOLO DEBE CONTENER EL ID DEL PRODUCTO
        try {
            const carts = await this.getCarts();
            console.log("carts:", carts);
            let cart = await this.getCartById(cartId)
            console.log("Cart:", cart);

             // Verifica si el carrito existe
            console.log("!Cart:", !cart);
            if (!cart) {
            console.log(`ERROR:NOT FOUND. El carrito ${cartId} NO EXISTE, por favor ingrese un carrito válido`);
            return null; // Devuelve null en lugar de una cadena de error
            }
            
            //busca el indice del carrito en el  archivo de carritos
            const cartIndex = carts.findIndex(cart => cart.id === cartId); 
            console.log("cartIndex:", cartIndex);
            
            //busca el producto en el carrito
            console.log("cart.products:", cart.products);
            const existingProduct = cart.products.find(product => product.id === productId);
            console.log("existingProduct:", existingProduct); 

            
            //burcar el indice del producto en el carrito
            console.log(`Tipo de productId en product Manager: ${typeof productId}, Valor de productId: ${productId}`);

            const productIndex = cart.products.findIndex(product => product.id=== productId)
            console.log("productIndex:", productIndex);

            //verifica si el producto a agregar ya esta en el carrito            
            if(productIndex !== -1){
                 // Si el producto ya existe en el carrito, actualizar su cantidad
                console.log("cart.products[productIndex]:", cart.products[productIndex]);
                cart.products[productIndex].quantity += quantity;
                console.log("Cart:", cart);
            } else {
                //si el producto no existe agrega el producto y la cantidad
                cart.products.push({id:productId , quantity})  
                console.log("Cart:", cart);             
            }

            // Actualizar el carrito en la lista de carritos
            const newUpdateCart = carts.map((c, index) => {
                return index === cartIndex ? cart : c;
            });

            // Escribir los datos actualizados en el archivo
            await writeDataToFile(this.path, newUpdateCart);
        
            return cart;

        } catch (error) {
            return error;
        }
    };    

    }

export const cartsManager = new CartsManager('./src/carrito.json');
