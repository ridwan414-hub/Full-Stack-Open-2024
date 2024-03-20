/* eslint-disable @stylistic/js/linebreak-style */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/',async(request, response) => {
  const blogs = await Blog.find({})
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
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
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
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id',async (request, response) => {
  const newUpdatedBlog = request.body
  const blog = await Blog.findByIdAndUpdate(request.params.id, newUpdatedBlog, { new: true })
  response.status(201).json(blog)
})

module.exports = blogsRouter