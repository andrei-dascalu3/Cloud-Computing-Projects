const { instances } = require('gstore-node');

const gstore = instances.get('unique-id');
const { Schema } = gstore;

const postSchema = new Schema({
    content: {type: String, optional: true },
    image: {type: String, required: true}
});

module.exports = gstore.model('Posts', postSchema);