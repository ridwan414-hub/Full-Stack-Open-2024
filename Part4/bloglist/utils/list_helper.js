/* eslint-disable @stylistic/js/linebreak-style */

// eslint-disable-next-line no-unused-vars
const dummy = ( blogs ) => { return (1)}
const totalLikes = (blogs) => {
  const likes = blogs.reduce((total, blog) => {
    total = total + blog.likes
    return total
  },0)
  return (likes)
}
const favoriteBlog = (blogs) => {
  let favoriteBlog = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes > favoriteBlog.likes) {
      favoriteBlog = blog
    }
  })
  const favoriteBlogWithFormat = {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes
  }
  return(favoriteBlogWithFormat)
}
const mostBlogs = (blogs) => {
  const authorCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
    return counts
  }, {})

  let maxBlogs = 0
  let topAuthor = ''

  for (const [author, count] of Object.entries(authorCounts)) {
    if (count > maxBlogs) {
      maxBlogs = count
      topAuthor = author
    }
  }

  return { author: topAuthor, blogs: maxBlogs }
}
const mostlikes = (blogs) => {
  const authorAndLikes = blogs.reduce((prev, blog) => {
    prev[blog.author] = (prev[blog.author] || 0) + blog.likes
    return prev
  }, {})
  let mostLikedAuthor = ''
  let mostLikesCounts = 0
  for (const [author, likes] of Object.entries(authorAndLikes)) {
    if (likes > mostLikesCounts) {
      mostLikesCounts = likes
      mostLikedAuthor = author
    }
  }
  return ({ author: mostLikedAuthor, likes: mostLikesCounts })
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostlikes }
























