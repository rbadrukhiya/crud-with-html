const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var register = new Schema({
    name:({
        type:String
    }),
    email:({
        type:String
    })
})

const MyModel = mongoose.model('register', register);
module.exports = MyModel