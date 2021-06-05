const Property = require('../models/properties');
const Status = require('http-status');


exports.getProperty = (request, response, next) => {
    const id = request.params.id;

    Property.findByPk(id).then((property) => {
        if (property) {
            response.send(property);
        } else {
            response.status(Status.NOT_FOUND).send();
        };
    }).catch((error) => next(error))
};

exports.getProperties = async(request, response, next) => {
    let limite = parseInt(request.query.limite || 0);
    let pagina = parseInt(request.query.pagina || 0);

    if (!Number.isInteger(limite) || !Number.isInteger(pagina)) {
        response.status(Status.BAD_REQUEST).send();
    };

    const ITENS_POR_PAGINA = 10;

    limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
    pagina = pagina <= 0 ? 0 : pagina * limite;

    Property.findAll({ limit: limite, offset: pagina }).then((properties) => {
        if (properties && properties.length) {
            response.send(properties);
        } else {
            response.status(Status.NOT_FOUND).send();
        };
    }).catch((error) => next(error));
};

exports.registerNewProperty = async (request, response, next) => {
    console.log("salvando")
    const cep = request.body.cep;
    const number = request.body.number;
    const complement = request.body.complement;
    const price = request.body.price;
    const rooms = request.body.rooms;

    Property.create({
        cep: cep,
        number: number,
        complement: complement,
        price: price,
        rooms: rooms
    }).then((result) => {
        response.status(Status.CREATED).send(result);
    }).catch((error) => next(error));
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