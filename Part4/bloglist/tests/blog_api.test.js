/* eslint-disable @stylistic/js/linebreak-style */
/* eslint-disable @stylistic/js/indent */
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { blogsInDB, initialBlogs, newBlog, blogWithoutLikes, blogWithoutTitleAndUrl,updatedBlog } = require('../tests/test_helper')
const Blog = require('../models/blog')
const api = supertest(app)


describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })
  describe('Adding Blogs', () => {
    test('POST request creates a new blog post', async () => {
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
      const blogsAtEnd = await blogsInDB()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)
      const title = blogsAtEnd.map(n => n.title)
      assert(title.includes('patterns'))
    })
  })
  describe('Checking Blogs', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('Data length is correct', async () => {
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, 2)
    })
    test('Is ID field defined as `id` insted of `_id`', async () => {
      const response = await api
        .get('/api/blogs')
      assert(response.body[0]._id === undefined)
    })
    test('Without likes is 0', async () => {
      await api
        .post('/api/blogs')
        .send(blogWithoutLikes)
        .expect(201)
      const blogsAtEnd = await blogsInDB()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)
      const likeLikes = blogsAtEnd.map(n => n.likes)
      assert(likeLikes.includes(0))
    })
    test('without title and url gives error', async () => {
      await api
        .post('/api/blogs')
        .send(blogWithoutTitleAndUrl)
        .expect(400)
      const blogsAtEnd = await blogsInDB()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
    })
  })
  describe('Deleting a Blog', () => {
    test('deletion of a blog', async () => {
      const blogsAtStart = await blogsInDB()
      const blogToDelete = blogsAtStart[0]
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
      const blogsAtEnd = await blogsInDB()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)
    })
  })
  describe('Updating a Blog', () => {
    test('putting a blog', async () => {
      const blogsAtStart = await blogsInDB()
      const blogToUpdate = blogsAtStart[0]
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(201)
      const blogsAtEnd = await blogsInDB()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
      const newLikes = blogsAtEnd.map(r => r.likes)
      assert(newLikes.includes(updatedBlog.likes))
    })
  })
})


after(async () => {
  await mongoose.connection.close()
})