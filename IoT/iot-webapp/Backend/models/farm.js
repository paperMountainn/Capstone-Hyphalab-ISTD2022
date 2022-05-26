const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// define the schema
const farmSchema = new Schema({
    images: [
        {
            url: {
                type: string,
                required: true,
            },
        }
    ]
})


const Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm;
