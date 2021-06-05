const Property = require('../models/properties');
const Status = require('http-status');

exports.getProperty = async (id) => {
    try {
        const property = await Property.findByPk(id);
        return property;
    } catch (error) {
        next(error)
    }
}

exports.getProperties = async (setLimit, setPage) => {
    let limit = setLimit;
    let page = setPage;
    const ITENS_PER_PAGE = 20;
    limit = limit > ITENS_PER_PAGE || limit <= 0 ? ITENS_PER_PAGE : limit;
    page = page <= 0 ? 0 : page * limit;

    try {
        const properties = await Property.findAll({ limit: limit, offset: page });
    return properties;
    } catch (error) {
        next(error);
    }   
};

exports.registerNewProperty = async (property) => {
    try {
       const newProperty = await Property.create({
            cep: property.cep,
            number: property.number,
            complement: property.complement,
            price: property.price,
            rooms: property.rooms
        });
        return newProperty;
    } catch (error) {
        next(error)
    }
    Property.create({
        cep: property.cep,
        number: property.number,
        complement: property.complement,
        price: property.price,
        rooms: property.rooms
    }).then((result) => {
        response.status(Status.CREATED).send(result);
    }).catch((error) => next(error));
}
