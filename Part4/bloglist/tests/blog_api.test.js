/* eslint-disable @stylistic/js/linebreak-style */
/* eslint-disable @stylistic/js/indent */
const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { blogsInDB, initialBlogs, newBlog,blogWithoutLikes } = require('../tests/test_helper')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})
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
test('POST request creates a new blog post'), async () => {

  await api
    .post('api/blog')
    .send(newBlog)
    .expect(201)
  const blogsAtEnd = await blogsInDB()
  assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)
  const title = blogsAtEnd.map(n => n.title)
  assert(title.includes('patterns'))
}

after(async () => {
  await mongoose.connection.close()
})