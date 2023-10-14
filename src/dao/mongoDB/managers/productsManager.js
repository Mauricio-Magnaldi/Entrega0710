import { productsModel } from "../../models/products.model.js";
import BasicManager from './basicManager.js';

class ProductsManager extends BasicManager {

    constructor() {
        super(productsModel);
    }

    //Aquí puedo agregar el método propio de productsManager

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