require('dotenv').config();
require('./src/model/associations');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./src/config/database');
const userRoute = require('./src/route/userRoute');
const roleRoute = require('./src/route/roleRoute')
const blacklistRoute = require('./src/route/blacklistRoute')

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTE
app.use('/users', userRoute);
app.use('/roles', roleRoute);
app.use('/blacklist', blacklistRoute);

// SINCRONIZZAZIONE
database.syncModels();

// PORTA
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server avviato sulla porta ${PORT}`);
});
