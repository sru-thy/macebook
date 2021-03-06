const posts = require('../controllers/posts');
const comments = require('../controllers/comments');
const { postAuth,commentAuth, loggedin } = require('../controllers/postauth');
const router = require('express').Router();


router.param('post', posts.load);
router.get('/', posts.list);
router.get('/post/:post', posts.show);
router.get('/createpost',loggedin,(req,res) => {
    res.render('createpost',{title: 'create post', message: undefined})
});
router.post('/createpost', loggedin,[ posts.validate], posts.create);
router.delete('/post/:post', [loggedin, postAuth], posts.destroy);
router.get('/post/:post/upvote', loggedin, posts.upvote);
router.get('/post/:post/downvote', loggedin, posts.downvote);
router.get('/post/:post/unvote', loggedin, posts.unvote);
router.get('/user/:user', posts.listByUser);

router.param('comment', comments.load);
router.post('/post/:post', [loggedin, comments.validate], comments.create);
router.delete('/post/:post/:comment', [loggedin, commentAuth], comments.destroy);

module.exports = router