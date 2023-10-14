export default class BasicManager {
    
    constructor(model){
        this.model = model;
    }

    async findAll(){
        return this.model.find().lean();
    }

    async findById(id){
        return this.model.findById(id);
    }

    async createOne(object){
        return this.model.createOne(object);
    }

    async updateOne(id, object){
        return this.model.updateOne({_id:id}, object);
    }

    async deleteOne(id){
        return this.model.deleteOne({_id:id});
    }
}
