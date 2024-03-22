/* eslint-disable @stylistic/js/linebreak-style */
/* eslint-disable @stylistic/js/indent */
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const { blogsInDB, initialBlogs, newBlog, blogWithoutLikes, blogWithoutTitleAndUrl,updatedBlog } = require('../tests/test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

//testing user -Ridwan414 added to test
beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('password414', 10)
  const user = new User({
    username: 'Ridwan414',
    name: 'Ridwan',
    blogs: [],
    passwordHash
  })

  await user.save()
},100000)
//Set Inital Blogs Under Ridwan's Profile
beforeEach(async () => {
  await Blog.deleteMany({})

  const users = await User.find({})
  const user = users[0]

  const blogObjects = initialBlogs
    .map(blog => new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: user._id,
      likes: blog.likes ? blog.likes : 0
    }))

  const promiseArray = blogObjects.map(blog => {
    blog.save()
    user.blogs = user.blogs.concat(blog._id)
  })
  await Promise.all(promiseArray)
  await user.save()
}, 100000)
describe('when there is initially some blogs saved', () => {
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
      const user = {
        username: 'Ridwan414',
        password: 'password414'
      }
      const loginUser = await api
        .post('/api/login')
        .send(user)
      await api
        .post('/api/blogs')
        .send(blogWithoutLikes)
        .expect(201)
        .set('Authorization', `Bearer ${loginUser.body.token}`)
      const blogsAtEnd = await blogsInDB()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)
      const likeLikes = blogsAtEnd.map(n => n.likes)
      assert(likeLikes.includes(0))
    })
    test('without title and url gives error', async () => {
      const user = {
        username: 'Ridwan414',
        password: 'password414'
      }
      const loginUser = await api
        .post('/api/login')
        .send(user)
        await api
        .post('/api/blogs')
        .send(blogWithoutTitleAndUrl)
        .set('Authorization', `Bearer ${loginUser.body.token}`)
        .expect(400)
      const blogsAtEnd = await blogsInDB()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length)
    })
  })
  describe('Adding Blogs', () => {
    test('POST request creates a new blog post', async () => {
      const user = {
        username: 'Ridwan414',
        password: 'password414'
      }
      const loginUser = await api
        .post('/api/login')
        .send(user)
        await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${loginUser.body.token}`)
        .expect(201)
      const blogsAtEnd = await blogsInDB()
      assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)
      const title = blogsAtEnd.map(n => n.title)
      assert(title.includes('patterns'))
    })
  })
  describe('Deleting a Blog', () => {
    test('deletion of a blog', async () => {

      const user = {
        username: 'Ridwan414',
        password: 'password414'
      }

      const loginUser = await api
        .post('/api/login')
        .send(user)


        const blogsAtStart = await blogsInDB()
        const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
        .set('Authorization', `Bearer ${loginUser.body.token}`)

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