import React, { useState } from 'react';
import blogService from '../services/blogs';

const BlogForm = (props) => {
const {setSuccessMessage,setErrorMessage,setBlogs,blogs}=props
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')
  
  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const createdBlog = await blogService
        .create({
      title: title,
      author: author,
      url: url
    })
      setBlogs(blogs.concat(createdBlog))
      setAuthor('')
      setTitle('')
      setUrl('')
            setSuccessMessage(`a new blog ${title} by ${author} added successfully`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000);
    } catch (error) {
      setErrorMessage(error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    };
  } 
  
  return (
      <div>
        <form onSubmit={handleCreate}>
          <div>
            title:
            <input type="text" value={title} onChange={({target})=>{setTitle(target.value)}}/>
          </div>
          <div>
            author:
            <input type="text" value={author} onChange={({target})=>{setAuthor(target.value)}}/>
          </div>
          <div>
          url:
            <input type="text" value={url} onChange={({target})=>{setUrl(target.value)}}/>
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    );
};

export default BlogForm;