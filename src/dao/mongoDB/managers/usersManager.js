import { usersModel } from "../../models/users.model.js";
import BasicManager from "./basicManager.js";

class UsersManager extends BasicManager {

    constructor() {
        super(usersModel);
    }
/*
    async findAll(){
        return usersModel.findAll();
    }

    async findById(id){
        return usersModel.findById(id);
    }

    async createOne(object){ 
        return usersModel.createOne(object);
    }

    async updateOne(id, object){
        return usersModel.updateOne({_id:id}, object);
    }

    async deleteOne(id){
        return usersModel.deleteOne({_id:id});
    }
*/
}

export const usersManager = new UsersManager();