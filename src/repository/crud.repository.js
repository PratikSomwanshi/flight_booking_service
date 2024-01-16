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

    async update(id, data, transaction) {
        const booking = await this.model.findByPk(id, {
            transaction,
        });

        await booking.update(data, { transaction });

        return booking;
    }

    async delete(id, transaction) {
        const booking = await this.model.findByPk(id, {
            transaction,
        });
        await booking.destroy({ transaction });
        return booking;
    }
}

module.exports = CrudRepository;
