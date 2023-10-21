export default class BasicManager {
    
    constructor(model){
        this.model = model;
    }

    async findAll(){
/*
El método .lean() se usa a menudo en combinación con consultas de bases de datos para obtener los resultados en forma de objetos JavaScript simples
*/     
        return this.model.find().lean();
    }

    async findById(id){
        return this.model.findById(id);
    }

    async createOne(object){
        //Conservar el metodo create, de lo contrario no lo almacena.
        return this.model.create(object);
    }

    async updateOne(id, object){
        return this.model.updateOne({_id:id}, object);
    }

    async deleteOne(id){
        return this.model.deleteOne({_id:id});
    }
};
