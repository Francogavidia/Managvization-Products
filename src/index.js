const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

//Settings
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//Routes
app.use(express.static(path.join(__dirname, 'views')));
app.use(require('./routes/products'));

//Start Server
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
}); 