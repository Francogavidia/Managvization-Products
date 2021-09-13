const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

//all products
router.get('/products', (req,res) => {
    const sql = 'SELECT * FROM products';

    mysqlConnection.query(sql,(err,rows, fields) => {
        if(!err){
            res.json(rows);
        }else {
            console.log(err);
        }
    });
});

router.get('/products/:formSearchName', (req,res) => {
    const {formSearchName} = req.params;
    const sql = `SELECT * FROM products WHERE name = '${formSearchName}'`;

    mysqlConnection.query(sql, (err,rows) => {
        if(!err){
            res.json(rows);
        }else {
            console.log(err);
        }
    });
});

router.get('/products/search/:formSearchCategory', (req,res) => {
    const {formSearchCategory} = req.params;
    const sql = `SELECT * FROM products WHERE category = '${formSearchCategory}'`;

    mysqlConnection.query(sql, (err,rows) => {
        if(!err){
            res.json(rows);
        }else {
            console.log(err);
        }
    });

});

router.post('/products/add', (req,res) => {
    const sql = 'INSERT INTO products SET ?';
    const productsDat = {
        name: req.body.names,
        description: req.body.descriptions,
        category: req.body.categorys,
        price: req.body.prices
    }


    mysqlConnection.query(sql, productsDat, err => {
        if(!err){
            res.send('Products Created')
        }else {
            console.log(err);
        }
    });
});

router.put('/products/update/:id', (req,res) => {
    const {id} = req.params;
    const {name, description, category, price} = req.body;
    const sql = `UPDATE products SET name = '${name}', description = '${description}', category = '${category}', price = '${price}' WHERE id = ${id}`;

    mysqlConnection.query(sql, (err,rows, fields) => {
        if(!err){
            res.send('Products Updates');
        }else {
            console.log(err);
        }
    });
});

router.delete('/products/delete/:id', (req,res) => {
    const {id} = req.params;
    const sql = `DELETE FROM products WHERE id = ${id}`;

    mysqlConnection.query(sql, (err,rows, fields) => {
        if(!err){
            res.send('Products Deletes');
        }else {
            console.log(err);
        }
    });
});


module.exports = router;