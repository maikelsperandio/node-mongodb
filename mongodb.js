const mongodb = require('mongodb').MongoClient;

var auth = {
    user: "admin",
    password: "pass"
}

// mongodb://192.168.100.38:27011,192.168.100.38:27012,192.168.100.38:27013/admin?replicaSet=rs0
// mongodb://localhost:30001,localhost:30002,localhost:30003/admin?replicaSet=my_replica_set

mongodb.connect('mongodb://localhost:30001,localhost:30002,localhost:30003/admin?replicaSet=my_replica_set', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(conn => global.conn = conn.db("connect-test"))
    .catch(e => {
        console.log('\x1b[41m%s\x1b[37m', 'CONNERROR - Não foi possível estabelecer a conexão com o serviço do MongoDB.', '\x1b[0m');
        console.log(e);
    });

function insert(customer, callback){
    console.log(customer);
    global.conn.collection("registros").insertOne(customer, callback);
}
module.exports = { insert }
