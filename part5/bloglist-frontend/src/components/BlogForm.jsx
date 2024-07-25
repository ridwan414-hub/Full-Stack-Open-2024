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
            id='title'
            type="text"
            value={newTitle}
            onChange={({ target }) => {
              setNewTitle(target.value);
            }}
            placeholder="write title here"
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type="text"
            value={newAuthor}
            onChange={({ target }) => {
              setNewAuthor(target.value);
            }}
            placeholder="write author here"
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type="text"
            value={newUrl}
            onChange={({ target }) => {
              setNewUrl(target.value);
            }}
            placeholder='write url here'
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
BlogForm.protoType={
  createNewBlog:PropTypes.func.isRequired
}
export default BlogForm
