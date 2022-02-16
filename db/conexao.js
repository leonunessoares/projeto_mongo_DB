const {MongoClient} = require ('mongodb');
const url = "mongodb://localhost:27017/dbnotas";

let _db;

const initdb = cb => {
    MongoClient.connect (url, {useUnifiedTopology:true })
    .then (client => {
        _db = client 
        cb(null, _db)
    })
    .catch(err => {
        cb(err);
    });
}

const getdb = () => {
    return _db;
}

module.exports = {
    initdb,
    getdb
}

