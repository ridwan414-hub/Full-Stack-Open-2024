/* eslint-disable @stylistic/js/linebreak-style */

const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const initialBlogs = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]
const testingUsers = async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('password414', 10)
  const user = new User({
    username: 'Ridwan414',
    name: 'Ridwan',
    blogs: [],
    passwordHash
  })

  await user.save()
}
const newBlog = {
  title: 'patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7
}
const blogWithoutLikes = {
  title: 'Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
}
const blogWithoutTitleAndUrl = {
  title: 'patterns',
  author: 'Michael Chan',
  likes: 7
}
const updatedBlog = {
  id: '5a422a851b54a676234d17f7',
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 678
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
const usersInDB = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports  = { blogsInDB ,usersInDB ,testingUsers, initialBlogs ,newBlog ,blogWithoutLikes ,blogWithoutTitleAndUrl ,updatedBlog }