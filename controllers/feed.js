const { validationResult } = require('express-validator');

const Post = require('../models/post');


exports.getPosts = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Entered data is not correct');
        error.statusCode = 422;
        return error;
    }
    res.status(200).json({
        posts: [{
            _id: '123',
            title: 'First Post',
            content: 'This is the first post!',
            imageUrl: 'images/hp1.png',
            creator: {
                name: 'Antoan'
            },
            date: new Date()
        }]
    });
};

exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    // Create post in db
    const post = new Post({
        title: title,
        content: content,
        imageUrl: 'images/hp1.png',
        creator: { name: 'Antoan' }
    });
    post.save()
        .then(result => {
            res.status(201).json({
                message: 'Post created successfully!',
                post: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};