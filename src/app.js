const express = require('express');
const http = require('http');
const status = require('http-status');
const propertyRoute = require('./routes/properties');
const userRoute = require('./routes/users');
const sequelize = require('./database/database');
const { Console } = require('console');

const app = express();

app.use(express.json());

app.use('/api', propertyRoute);
app.use('/api', userRoute);

app.use((request, response, next) => {
    response.status(status.NOT_FOUND).send()
});

app.use((error, request, response, next) => {
    if (error.name === "SequelizeUniqueConstraintError") {
        return response.status(status.CONFLICT).json({message: "E-mail or CPF already registered"});        
    }
    if (error.message.includes("Validation")) {
        return response.status(status.BAD_REQUEST).json({ message: error.message })
    }
    response.status(status.INTERNAL_SERVER_ERROR).json({ message: error.message })
});

sequelize.sync({ force: true }).then(() => {
    const port = process.env.PORT || 3000;

    app.set('port', port);

    const server = http.createServer(app);

    server.listen(port, () => console.log('Server online on http://localhost:' + port));
});