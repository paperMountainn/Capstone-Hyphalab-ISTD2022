const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// define the schema
const incubationSchema = new Schema({
    images: [
        {
            url: {
                type: string,
                required: true,
            },
        }
    ]
})


const Incubation = mongoose.model('Incubation', incubationSchema);
module.exports = incubationSchema;
