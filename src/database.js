const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: '123',
    database: 'managvization'
});

mysqlConnection.connect(function (err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('Database is Connected');
    }
});

module.exports = mysqlConnection;