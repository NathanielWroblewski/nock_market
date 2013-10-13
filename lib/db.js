var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

// Connect to cloud database

var username = process.env['MONGOLAB_USERNAME']
var password = process.env['MONGOLAB_PASSWORD']
var address = process.env['MONGOLAB_ADDRESS'];
connect();

// Connect to mongo
function connect() {
  var url = 'mongodb://' + username + ':' + password + address;
  mongoose.connect(url);
}

function disconnect() {
  mongoose.disconnect();
}

var Db = require('mongodb').Db
  , Connection = require('mongodb').Connection
  , Server = require('mongodb').Server;

var envHost = process.env['MONGO_NODE_DRIVER_HOST']
  , envPort = process.env['MONGO_NODE_DRIVER_PORT']
  , host = envHost != null ? envHost: 'localhost'
  , port = envPort != null ? envPort: Connection.DEFAULT_PORT;

var db = new Db('nockmarket'
  , new Server(host, port, {})
  , { native_parser: false });

module.exports = {
  find: function(name, query, limit, callback) {
    db.collection(name).find(query)
      .sort({_id: -1})
      .limit(limit)
      .toArray(callback);
  },
  findOne: function(name, query, callback) {
    db.collection(name).findOne(query, callback);
  },
  insert: function(name, items, callback) {
    db.collection(name).insert(items, callback);
  },
  insertOne: function(name, item, callback) {
    module.exports.insert(name, item, function(err, items) {
      callback(err, items[0]);
    });
  },
  open: function(callback) {
    db.open(callback);
  }
}
