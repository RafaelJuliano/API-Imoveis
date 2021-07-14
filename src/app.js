const express = require('express');
const http = require('http');
const status = require('http-status');
const propertyRoute = require('./routes/properties');
const userRoute = require('./routes/users');
const sequelize = require('./database/database');
var cors = require('cors')



const app = express();
var corsOptions = {
	origin : 'http://localhost:4200',
	optionsSuccessStatus: 200
  }

app.use(cors(corsOptions))

app.use(express.json());

//Rotas da API.
app.use('/', (req, res)=>{
    res.send("API works")
})

app.use('/api', propertyRoute);
app.use('/api', userRoute);

//Resposta padrão caso a rota não exista.
app.use((request, response, next) => {
    response.status(status.NOT_FOUND).send()
});

//Tratamento de erros.
app.use((error, request, response, next) => {
    if (error.name === "SequelizeUniqueConstraintError") {
        return response.status(status.CONFLICT).json({message: "E-mail or CPF already registered"});        
    }
    if (error.message.includes("Validation")) {
        return response.status(status.BAD_REQUEST).json({ message: error.message })
    }
    response.status(status.INTERNAL_SERVER_ERROR).json({ message: error.message })
});

//force true para limpar o banco toda vez que iniciar a aplicação.
sequelize.sync({ force: true }).then(() => {
    const port = process.env.PORT || 3000;

    app.set('port', port);

    const server = http.createServer(app);

    server.listen(port, () => console.log('Server online on http://localhost:' + port));
});