const express = require('express');
var { Employee } = require('../models/employee');
var ObjectId = require('mongoose').Types.ObjectId;

const router = express.Router();

router.get('/', (req, res) => {
    Employee.find((err, value) => {
       if (!err) {
           res.send(value);
       } else {
           console.log('Error Retriving Employees..' + JSON.stringify(err, undefined, 2));
       }
    }
)});

router.get('/:id', (req, res) => {

    var id = req.params.id;

    if(!ObjectId.isValid(id))
    {
       return res.status(404).send(`No record of ${id}`);
    }

    Employee.findById( id, (err, value) => {
        if (!err) {
            res.send(value);
        } else {
            console.log('Error Retriving Employees..' + JSON.stringify(err, undefined, 2));
        }
    })
});

router.put('/:id', (req, res) => {
 
    var id = req.params.id;

    if(!ObjectId.isValid(id))
    {
       return res.status(404).send(`No record of ${id}`);
    }

    var emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    };

    Employee.findByIdAndUpdate(id, { $set: emp }, { new: true }, 
        (err, value) => {
            if (!err) {
                res.send(value);
            } else {
                console.log('Error Retriving Employees..' + JSON.stringify(err, undefined, 2));
            }
        });

});

router.delete('/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectId.isValid(id))
    {
       return res.status(404).send(`No record of ${id}`);
    }

    Employee.findByIdAndRemove(id, (err, value) => {
        if (!err) {
            res.send(value);
        } else {
            console.log('Error Retriving Employees..' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.post('/', (req, res) => {
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });

    emp.save((err, value) => {
        if (!err) {
            res.send(value);
        } else {
            console.log('Error Retriving Employees..' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;