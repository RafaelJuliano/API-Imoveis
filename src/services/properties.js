const Property = require('../models/properties');
const Status = require('http-status');

exports.getProperty = async (id) => {
    const property = await Property.findByPk(id);
    return property;
}

exports.getProperties = async (setLimit, setPage) => {
    let limit = setLimit;
    let page = setPage;
    const ITENS_PER_PAGE = 20;
    limit = limit > ITENS_PER_PAGE || limit <= 0 ? ITENS_PER_PAGE : limit;
    page = page <= 0 ? 0 : page * limit;

    const properties = await Property.findAll({ limit: limit, offset: page });
    return properties;
};

exports.registerNewProperty = async (property) => {
    const newProperty = await Property.create({
        cep: property.cep,
        number: property.number,
        complement: property.complement,
        price: property.price,
        rooms: property.rooms
    });
    return newProperty;
}

exports.updateProperty = async (property, next) => {
    const propertyExist = await Property.findByPk(property.id);
    if (propertyExist) {
        const result = await Property.update({
            number: property.number,
            cep: property.cep,
            complement: property.complement,
            price: property.price,
            rooms: property.rooms
        }, { where: { id: property.id } });
        return 'updated';
    } else {
        return 'not found';
    }
}