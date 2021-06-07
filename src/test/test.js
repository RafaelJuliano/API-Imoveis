const axios = require('axios');
const crypto = require('crypto');
const url = 'http://localhost:3000/api';

var token;

const generate = function () {
    return crypto.randomBytes().toString('hex');
}

const request = function (url, method, data) {
    axios.defaults.headers = {       
        Authorization: 'Bearer ' + token
    };
    return axios({ url, method, data, validateStatus: false });
}

test('Should create a user', async function(){
    const newUser = {
        "name": "Rafael Juliano Ferreira",
        "cpf": "000.111.222-20",
        "email": "rafaelferreira@hotmail.com",
        "pwd": "12345678"
    }
    const endPoint = `${url}/usuarios/cadastro`;
    const response = await request(endPoint, 'post', newUser);
    expect(response.data.id).toBe(1); 
});

test('Should not duplicated email', async function(){
    const newUser = {
        "name": "Rafael Juliano Ferreira",
        "cpf": "000.111.222-20",
        "email": "rafaelferreira@hotmail.com",
        "pwd": "12345678"
    }
    const endPoint = `${url}/usuarios/cadastro`;
    const response = await request(endPoint, 'post', newUser);
    expect(response.status).toBe(409);
});

test('Should not validate cpf', async function(){
    const newUser = {
        "name": "Rafael Juliano Ferreira",
        "cpf": "000.111.222.00",
        "email": "rafaelferreira@hotmail.com",
        "pwd": "12345678"
    }
    const endPoint = `${url}/usuarios/cadastro`;
    const response = await request(endPoint, 'post', newUser);
    expect(response.status).toBe(400);
});

test('Should login', async function(){
    const user = {
        "email": "rafaelferreira@hotmail.com",
        "pwd": "12345678"
    }
    const endPoint = `${url}/usuarios/login`;
    const response = await request(endPoint, 'post', user);
    token = response.data.token;
    expect(response.status).toBe(200);
});

test('Should not login', async function(){
    const user = {
        "email": "rafaelferreira@hotmail.com",
        "pwd": "1234567s8"
    }
    const endPoint = `${url}/usuarios/login`;
    const response = await request(endPoint, 'post', user);
    expect(response.status).toBe(401);
});

test('Should save a property', async function () {
    const property = {
        cep: '80150-030',
        number: 50,
        complement: 'fundos',
        price: 150000,
        rooms: 3
    };    
    const endPoint = `${url}/imoveis`; 
    const response = await request(endPoint, 'post', property);    
    expect(response.status).toBe(201);   
});

test('Should get a property', async function () {
    const property = {
        "id" : 1
    };    
    const endPoint = `${url}/imoveis/${property.id}`;
    const response = await request(endPoint, 'get');
    expect(response.status).toBe(200);   
});

test('Should update one item in a property', async function () {
    const property = {
        id : 1,
        cep: '80150-000'    
    };     
    const endPoint = `${url}/imoveis/${property.id}`;
    const response = await request(endPoint, 'patch', property);
    const updatedProperty = await request(endPoint, 'get');
    expect(response.status).toBe(200);
    expect(updatedProperty.data.cep).toBe(property.cep);   
});

test('Should recieve bad request status', async function () {
    const property = {
        id : 1,
        cep: '80150-0000'    
    };     
    const endPoint = `${url}/imoveis/${property.id}`;
    const response = await request(endPoint, 'patch', property);
    expect(response.status).toBe(400);
});

test('Should delete a property', async function () {
    const property = {
        "id" : 1
    };    
    const endPoint = `${url}/imoveis/${property.id}`;
    const response = await request(endPoint, 'delete');    
    expect(response.status).toBe(200);   
});

test('Should save, get and delete many properties', async function () {
    const property = {
        cep: '80150-030',
        number: 50,
        complement: 'fundos',
        price: 150000,
        rooms: 3
    };    
    const endPoint = `${url}/imoveis`;
    await request(endPoint, 'post', property);
    await request(endPoint, 'post', property);
    await request(endPoint, 'post', property);
    const response = await request(endPoint, 'get');
    expect(response.data).toHaveLength(3);
    expect(response.status).toBe(200);
    for (let id = 2; id <= 4; id++){
        await request(`${url}/imoveis/${id}`, 'delete');
    }   
});

