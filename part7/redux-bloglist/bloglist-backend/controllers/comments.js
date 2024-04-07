const commentsRouter = require('express').Router()
const Blog = require('../models/blog');
const Comment = require('../models/comment');

commentsRouter.get("/:id/comments", async (req, res) => {
    const comments = await Comment.find({ blog: req.params.id }).populate('blog', { title: 1})
    console.log(comments)
    res.json(comments)
})

commentsRouter.post("/:id/comments", async (req, res) => {
    const content = req.body.content;
    const blog = await Blog.findById(req.params.id)
    const comment = new Comment({ content: content, blog: blog._id })
    if (content === undefined) { res.status(400).end() }
    else {
        const savedComment = await comment.save()
        blog.comments = blog.comments.concat(savedComment._id)
        const savedBlog = await blog.save()
        res.status(201).json(savedComment)
    }
})

module.exports = commentsRouter