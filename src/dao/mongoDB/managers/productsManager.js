import { productsModel } from "../../models/products.model.js";
import BasicManager from './basicManager.js';

//CRUD de productsManager

class ProductsManager extends BasicManager {
    constructor() {
        //Método para pasar el modelo el cual quiero que utilice BasicManager
        super(productsModel);
    }
   /*
    //Aquí puedo agregar el método propio de products
    async findAllProducts(object) {
        const { limit=10, page=1, sort, ...queryFilter } = object;
        const respuesta = await productsModel.paginate(queryFilter,{limit, page, sort: {price}});
    }
*/
/*    async findAll(){
        return productsModel.find();
    }

    async findById(id){
        return productsModel.findById(id);
    }

    async createOne(object){
        return productsModel.createOne(object);
    }

    async updateOne(id, object){
        return productsModel.updateOne({_id:id}, object);
    }

    async deleteOne(id){
        return productsModel.deleteOne({_id:id});
    }
*/
}

export const productsManager = new ProductsManager();