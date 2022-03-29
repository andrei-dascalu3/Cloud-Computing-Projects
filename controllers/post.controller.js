const Post = require('../models/post.model');

const getPosts = (_, res) => {
    Post.list()
        .then(entities => res.json(entities))
        .catch(err => res.status(400).json(err));
};

module.exports = {
    getPosts
};