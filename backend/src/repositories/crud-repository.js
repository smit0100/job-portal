const { ClientError } = require('../utils/error/client-error');

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    create = async (data) => {
        try {
           
            const result = await this.model.create(data);
            
            return result;
        } catch (error) {
            console.log("🚀 ~ file: crud-repository.js ~ line 33 ~ CrudRepository ~ create= ~ error", error)
            throw error;
        }
    }

    destroy = async (id) => {
        try {
            const result = await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

    get = async (id) => {
        try {
            const result = await this.model.findById(id);
            return result;
        }catch(error){
            throw error;
        }
    }

    getAll = async () => {
        try {
            const result = await this.model.find({});
            return result;
        } catch (error) {
            throw error;
        }
    }

    update = async (id,data) => {
        try {
            const result = await this.model.findByIdAndUpdate(id, data, { new: true });
            return result;
        }catch(error){
            throw error;
        }
    }
}


module.exports = CrudRepository; 