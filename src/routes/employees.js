'use strict'

const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

router.get('/', (req, res) =>{
    mysqlConnection.query('SELECT * FROM employees',(error, rows, fields) =>{
        if(!error){
            res.json(rows);
        }else{
            console.log(error);
        }
    });
});

router.get('/:id',(req, res) =>{
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM employees where id = ?' , [id], (error, rows, fields) =>{
        if(!error){
            res.json(rows[0]);
        }else{
            console.log(error);
        }
    });
});

router.post('/',(req, res) =>{
    const { id , name, salary } = req.body;
    const query = `
        CALL employeeAddOrEdit(?, ?, ?);
    `;
    mysqlConnection.query(query, [id, name, salary], (error, rows, fields) => {
        if(!error){
            res.json({status: 'Employeed Saved'});
        }else{
            console.log(error);
        }
    });
});

router.put('/:id',(req, res) => {
    const { name, salary } = req.body;
    const { id } = req.params;
    const query = `CALL employeeAddOrEdit(?, ?, ?)`;
    mysqlConnection.query(query,[id, name, salary], (error, rows, fields) =>{
        if(!error){
            res.json({status: 'Employeed Updated'});
        }else{
            console.log(error);
        }
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM employees WHERE id =?', [id], (error, rows, fields) =>{
        if(!error){
            res.json({status: 'Employee Deleted'});
        }else{
            console.log(error);
        }
    });
});

module.exports = router; 