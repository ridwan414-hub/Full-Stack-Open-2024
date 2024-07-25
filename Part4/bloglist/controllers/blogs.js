/* eslint-disable @stylistic/js/linebreak-style */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/',async(request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.status(200).json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const searchedBlog = await Blog.findById(request.params.id)
  if (searchedBlog) {
    response.status(202).json(searchedBlog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/',async (request, response) => {
  const body = request.body

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user:user.id,
    likes: body.likes
  })
  if (!blog.title || !blog.url) {
    response.status(400).end()
  }
  else {
    if (!blog.likes) {
      blog.likes = 0
    }
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() === request.user.id) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'Unauthorized to delete the blog' })
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const newUpdatedBlog = request.body
  const newBlogObject = {
    user: newUpdatedBlog.user.id,
    likes: newUpdatedBlog.likes,
    author: newUpdatedBlog.author,
    title: newUpdatedBlog.title,
    url: newUpdatedBlog.url
  }
  const blog = await Blog.findByIdAndUpdate(request.params.id, newBlogObject, { new: true })
  response.status(201).json(blog)
})

module.exports = blogsRouter