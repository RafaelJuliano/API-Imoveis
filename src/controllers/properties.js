const Property = require('../models/properties');
const Status = require('http-status');
const service = require('../services/properties');


exports.getProperty = async (request, response, next) => {
    const id = request.params.id;
    const property = await service.getProperty(id);
    if (property) {
        response.send(property);
    } else {
        response.status(Status.NOT_FOUND).send();
    };
};

exports.getProperties = async (request, response, next) => {
    const limit = parseInt(request.query.limit || 0);
    const page = parseInt(request.query.page || 0);

    if (!Number.isInteger(limit) || !Number.isInteger(page)) {
        response.status(Status.BAD_REQUEST).send();
    };

    const properties = await service.getProperties(limit, page);

    if (properties && properties.length) {
        response.send(properties);
    } else {
        response.status(Status.NOT_FOUND).send();
    };    
};

exports.registerNewProperty = async (request, response, next) => {
    const property = {
        cep: request.body.cep,
        number: request.body.number,
        complement: request.body.complement,
        price: request.body.price,
        rooms: request.body.rooms
    };
    
    const newProperty = await service.registerNewProperty(property);
    response.status(Status.CREATED).send(newProperty);
}

exports.updateProperty = (request, response, next) => {
    const id = request.params.id;

    const cep = request.body.cep;
    const number = request.body.number;
    const complement = request.body.complement;
    const price = request.body.price;
    const rooms = request.body.rooms;

    Property.findByPk(id).then((property) => {
        if (property) {
            Property.update({
                number: number,
                cep: cep,
                complement: complement,
                price: price,
                rooms: rooms
            }, { where: { id: id } }).then(() => {
                response.send()
            }).catch((error) => next(error))
        } else {
            response.status(Status.NOT_FOUND).send()
        }
    }).catch((error) => next(error))
}

exports.deleteProperty = async (request, response, next) => {
    const id = request.params.id

    Property.findByPk(id).then((property) => {
        if (property) {
            Property.destroy({
                where: { id: id }
            }).then(() => {
                response.send()
            }).catch((error) => next(error))
        } else {
            response.status(Status.NOT_FOUND).send()
        }
    }).catch((error) => next(error))
}