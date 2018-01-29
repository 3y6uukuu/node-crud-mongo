const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect('mongodb://trojan:00000000@ds000000.mlab.com:47047/crud', (err, db) => {
    if (err) return console.log(err);

    app.listen(3000, () => {
        console.log('app working on 3000');
    });

    const dbase = db.db('crud');

    app.post('/name/add', (req, res) => {
        const name = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        };

        dbase.collection('name').save(name, err => {
            if (err) return console.log(err);

            res.send('name added successfully');
        });
    });

    app.get('/name', (req, res) => {
        dbase.collection('name').find().toArray((err, results) => {
            res.send(results)
        });
    });

    app.get('/name/:id', (req, res) => {
        if (err) throw err;

        const id = ObjectID(req.params.id);
        
        dbase.collection('name').find(id).toArray((err, result) => {
            if (err) throw err;

            res.send(result);
        });
    });

    app.put('/name/update/:id', (req, res) => {
        const id = {
            _id: new ObjectID(req.params.id);
        };

        const dataSet = {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }
        };

        dbase.collection('name').update(id, dataSet, err => {
            if (err) throw err;

            res.send('user updated successfully');
        });
    });


    app.delete('/name/delete/:id', (req, res) => {
        const id = ObjectID(req.params.id);

        dbase.collection('name').deleteOne({_id: id}, err => {
            if (err) throw err;

            res.send('user deleted');
        });
    });
});