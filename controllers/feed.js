const { validationResult } = require('express-validator');


exports.getPosts = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: 'Entered data is not correct', errors: errors.array() });
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
    res.status(201).json({
        message: 'Post created successfully!',
        post: { id: new Date().toISOString(), title: title, content: content, creator: { name: 'Antoan' }, createdAt: new Date() }
    });
};