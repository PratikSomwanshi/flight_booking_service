class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data, transaction) {
        const response = await this.model.create(data, {
            transaction: transaction,
        });
        return response;
    }

    async get(id) {
        const response = await this.model.findByPk(id);
        return response;
    }

    async getAll() {
        const response = await this.model.findAll();
        return response;
    }

    async update(data, id) {
        const airplane = await this.model.findByPk(id);

        airplane.set({
            capacity: data.capacity,
            modelNumber: data.modelNumber,
        });

        await airplane.save();

        return airplane;
    }

    async delete(id) {
        const airplane = await this.model.findByPk(id);
        await airplane.destroy();
        return airplane;
    }
}

module.exports = CrudRepository;
