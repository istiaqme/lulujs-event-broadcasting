const Post = lulu.use('app/models/mongoose/Post');
const slugify = require('slugify');
const NotFoundError = lulu.use('app/errors/NotFoundError');
const Comment = lulu.use('app/models/mongoose/Comment');
module.exports = {
    list: async function () {
        await Post.find();
    },
    create: async function (data) {
        const post = new Post({
            title: data.title,
            content: data.content,
            userId: data.userId,
            slug: slugify(data.title, {lower: true})
        });
        await post.save();
        return post;
    },
    createComment: async function (data) {
        const post = await this.getPostById(data.postId);
        if(!post){
            throw new NotFoundError("Post Not Found");
        }

        const comment = new Comment({
            content: data.content,
            userId: data.userId,
            postId: data.postId
        });

        await comment.save()

        return {
            comment,
            post: post
        };
    },
    getPostById: async function (id) {
        return await Post.findById(id);
    }
}