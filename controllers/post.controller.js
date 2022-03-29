const Post = require('../models/post.model');

const getPosts = (_, res) => {
    Post.list()
        .then(entities => {
            res.render("other-posts", {postsData: entities});
        }).catch(err => res.status(400).json(err));
};

const createPost = (req, res) => {
    console.log(req.body);
    const entityData = Post.sanitize(req.body);
    const post = new Post(entityData);
    post.save()
    .then((entity) => {
        res.json(entity.plain());
    })
    .catch((err) => {
        res.status(400).json(err);
    });
};

module.exports = {
    getPosts,
    createPost
};