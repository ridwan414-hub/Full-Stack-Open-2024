/* eslint-disable linebreak-style */
import PropTypes from 'prop-types'
import React, { useState } from 'react'

const BlogForm = ({ createNewBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()
    createNewBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            type="text"
            value={newTitle}
            onChange={({ target }) => {
              setNewTitle(target.value)
            }}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newAuthor}
            onChange={({ target }) => {
              setNewAuthor(target.value)
            }}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newUrl}
            onChange={({ target }) => {
              setNewUrl(target.value)
            }}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
BlogForm.protoType={
  createNewBlog:PropTypes.func.isRequired
}
export default BlogForm
