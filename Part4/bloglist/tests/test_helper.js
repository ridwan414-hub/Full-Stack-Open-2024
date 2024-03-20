/* eslint-disable @stylistic/js/linebreak-style */

const Blog = require('../models/blog')

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

module.exports  = { blogsInDB , initialBlogs ,newBlog ,blogWithoutLikes ,blogWithoutTitleAndUrl ,updatedBlog }