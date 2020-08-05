const { body, validationResult } = require('express-validator');
const Post = require('../models/Posts');
const User = require('../models/Users');


exports.load = async (req, res, next, id) => {
    try {
      req.post = await Post.findById(id);
      if (!req.post) return res.status(404).json({ message: 'post not found' });
    } catch (err) {
      if (err.name === 'CastError')
        return res.status(400).json({ message: 'invalid post id' });
      return next(err);
    }
    next();
};

exports.show = async (req, res) => {
    const post = await Post.findByIdAndUpdate(
      req.post.id,
      { new: true }
    );
    res.json(post);
  };

  exports.list = async (req, res) => {
    const posts = await Post.find().sort('-score');
    res.json(posts);
  };

  exports.listByUser = async (req, res) => {
    const username = req.params.user;
    const author = await User.findOne({ username });
    const posts = await Post.find({ author: author.id }).sort('-created');
    res.render('profile');
  };


  exports.create = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = result.array({ onlyFirstError: true });
      return res.render('createpost',{ message: errors[0].msg})
    }
  
    try {
      const { title, url,type, text } = req.body;
      const author = req.user.id;
      const post = await Post.create({
        title,
        url,
        author,
        type,
        text
      });
      res.redirect('/user/'+ req.user.username);
    } catch (err) {
      next(err);
    }
  };
  
  const titleIsValid = body('title')
    .exists()
    .withMessage('title is required :(')
  
    .isLength({ min: 1 })
    .withMessage('title cannot be blank :(')
  
    .isLength({ max: 100 })
    .withMessage('title must be at most 100 characters long :(')
  
    .custom(value => value.trim() === value)
    .withMessage('title cannot start or end with whitespace :(');
  
  const urlOrTextIsValid = (req, res, next) => {
    if (req.body.type === 'link') {
      const chain = body('url')
        .exists()
        .withMessage('url is required :(')
  
        .isURL()
        .withMessage('url is invalid :(');
  
      chain(req, res, next);
    } else {
      const chain = body('text')
        .exists()
        .withMessage('text is required :(')
  
        .isLength({ min: 4 })
        .withMessage('text must be at least 4 characters long :(');
  
      chain(req, res, next);
    }
  };
  
  exports.validate = [
    titleIsValid,
    urlOrTextIsValid
  ];
  
  exports.upvote = async (req, res) => {
    const post = await req.post.vote(req.user.id, 1);
    res.json(post);
  };
  
  exports.downvote = async (req, res) => {
    const post = await req.post.vote(req.user.id, -1);
    res.json(post);
  };
  
  exports.unvote = async (req, res) => {
    const post = await req.post.vote(req.user.id, 0);
    res.json(post);
  };
  
  exports.destroy = async (req, res) => {
    await req.post.remove();
    res.json({ message: 'success' });
  };