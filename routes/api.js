const express = require('express');
const router = express.Router();
/* Controllers */
const UserController = lulu.use('app/controllers/HTTP/UserController');
const PostController = lulu.use('app/controllers/HTTP/PostController');
/* Controllers */
/* Request Validator Middlewares */
const UserRegistrationRequest = lulu.use('app/requests/UserRegistrationRequest');
const PostCreateRequest = lulu.use('app/requests/PostCreateRequest');
const CommentCreateRequest = lulu.use('app/requests/CommentCreateRequest');
/* Request Validator Middlewares */

const Authenticate = lulu.use('app/middlewares/Authenticate');

router.get('/', (req, res) => {
    res.send("Hi From API");
});

router.post('/user/register', [
    UserRegistrationRequest
],  UserController.register);


router.get('/post/list', [
    Authenticate
],  PostController.list);

router.post('/post/create', [Authenticate, PostCreateRequest], PostController.create);
router.post('/post/comment/create/:postId', [Authenticate, CommentCreateRequest], PostController.createComment);

router.post('/user/login', [], UserController.login);



module.exports = router;