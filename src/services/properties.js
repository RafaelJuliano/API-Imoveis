const Property = require('../models/properties');

/*
PROPERTY SERVICE LAYER
Responsável por executar a regra de negócio e invocar o objeto Sequelize para operações no banco de dados.
*/


/**
 * Retorna um imóvel pelo seu ID
 * @param {Number} id - ID do imóvel 
 * @returns {Property} - Imóvel encontrado.
 */
exports.getProperty = async (id) => {
    const property = await Property.findByPk(id);
    return property;
}


/**
 * Retorna a quantidade (limit) do intervalo (page) dos imóveis cadastrados ordenados pelo id;
 * exemplo. (page = 2, limit = 10) Retorna intervalo entre 21 e 30.
 * @param {Number} setLimit - Tamanho do intervalo retornado.
 * @param {Number} setPage - Determina o intervalo retornado.
 * @returns {Proerty[]} - Array de objetos com imóveis.
 */
exports.getProperties = async (setLimit, setPage) => {
    let limit = setLimit;
    let page = setPage;

    //Impede que o limite seja maior que 20 ou negativo
    const ITENS_PER_PAGE = 20;
    limit = limit > ITENS_PER_PAGE || limit <= 0 ? ITENS_PER_PAGE : limit;
    page = page <= 0 ? 0 : page * limit;

    const properties = await Property.findAll({ limit: limit, offset: page });
    return properties;
};


/**
 * Cadastra um novo imóvel.
 * @param {Property} property - Objeto com dados do imóvel.
 * @returns {Property} - Objeto do imóvel cadastrado.
 */
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


/**
 * Atualiza um ou mais dados de um imóvel.
 * @param {Property} property - Objeto com dados a serem atualizados do imóvel. ID é obrigatório.
 * @returns {String} - updated || not found.
 */
exports.updateProperty = async (property) => {
    const propertyExist = await Property.findByPk(property.id);
    if (propertyExist) {
        const updated = await Property.update({
            number: property.number,
            cep: property.cep,
            complement: property.complement,
            price: property.price,
            rooms: property.rooms
        }, { where: { id: property.id } });
        if (updated) return 'updated';
    } else {
        return 'not found';
    }
}


/**
 * Deleta um imóvel.
 * @param {Number} id - Id do imóvel a ser deletado.
 * @returns {String} - String com confirmação se o imóvel foi deletado ou não encontrado.
 */
exports.deleteProperty = async (id) => {
    const propertyExist = await Property.findByPk(id);
    if (propertyExist) {
        const deleted = await Property.destroy({ where: { id: id } });
        if(deleted)  return 'deleted';
    } else {
        return 'not found';
    }
}