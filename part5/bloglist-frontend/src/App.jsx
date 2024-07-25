/* eslint-disable linebreak-style */
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)
  const BlogsFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }
  const createNewBlog = async (newBlogObject) => {
    try {
      BlogsFormRef.current.toggleVisibility()
      const newBlog = await blogService
        .create(newBlogObject)
      setBlogs(blogs.concat(newBlog))
      setSuccessMessage(
        `a new blog ${newBlogObject.title} by ${newBlogObject.author} added successfully`
      )
    }catch (error) {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const updateLikedBlog = async(likedBlogObject) => {
    try {
      const newUpdatedBlog = await blogService
        .update(likedBlogObject)
      setSuccessMessage(
        `Blog ${likedBlogObject.title} was successfully updated`
      )
      setBlogs(blogs.map(blog => blog.id!==likedBlogObject.id?blog:newUpdatedBlog))
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(error.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const deleteBlog = async (BlogToDelete) => {
    try {
      if (window.confirm(`Remove blog ${BlogToDelete.title} by ${BlogToDelete.author} ?`)) {
        blogService.remove(BlogToDelete.id)
        setSuccessMessage(
          `Blog ${BlogToDelete.title} was successfully deleted`
        )
        setBlogs(blogs.filter((blog) => blog.id !== BlogToDelete.id))
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
    } catch (exception) {
      setErrorMessage(`Cannot delete blog ${BlogToDelete.title}`)
      setSuccessMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }
  if (user === null) {
    return (
      <>
        <h2>Log in to application</h2>
        <Notification errorMessage={errorMessage}></Notification>
        <LoginForm
          handleLogin={handleLogin}
          setPassword={setPassword}
          setUsername={setUsername}
          username={username}
          password={password}
        ></LoginForm>
      </>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      ></Notification>
      <p>
        {user.username} logged in{' '}
        <button onClick={handleLogout} type="submit">
          logout
        </button>
      </p>
      <Toggleable buttonLabel="new note" ref={BlogsFormRef}>
        <BlogForm createNewBlog={createNewBlog}></BlogForm>
      </Toggleable>
      <div>
        <ul>
          {blogs.sort((b1,b2) => b2.likes-b1.likes).map((blog) => (
            <Blog key={blog.id} blog={blog} updateLikedBlog={updateLikedBlog} deleteBlog={deleteBlog} user={user} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
