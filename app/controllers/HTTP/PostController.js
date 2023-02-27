const PostService = lulu.use('app/services/PostService');
const Handler = lulu.use('app/errors/Handler');
const response = lulu.use('app/responses/Response');
const Event = lulu.use('app/responses/Event');
module.exports = {
    list: async function (req, res) {
        try {
            const posts = await PostService.list();
            return response.dispatch("Posts Listed Successfully", {posts}, res, 200);
        }
        catch (error) {
            return response.error(Handler(error), res);
        }
    },
    create: async function (req, res) {
        try {
            const post = await PostService.create({
                title: req.body.title,
                content: req.body.content,
                userId: req.headers.__user
            });
            Event.emit(`notify/post-created`, post);
            return response.dispatch("Post Created Successfully", {post}, res, 200);
        }
        catch (error) {
            return response.error(Handler(error), res);
        }
    },
    createComment: async function (req, res) {
        try {
            const newComment = await PostService.createComment({
                content: req.body.content,
                userId: req.headers.__user,
                postId: req.params.postId
            });
            Event.emit(`notify/post-comment-created/${newComment.post.userId}`, newComment);
            return response.dispatch("Post Comment Created Successfully", {newComment}, res, 200);
        }
        catch (error) {
            return response.error(Handler(error), res);
        }
    }
}