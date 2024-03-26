import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('<AddBlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm createNewBlog={createBlog} />);

  const titleInput = screen.getByPlaceholderText('write title here');
  const authorInput = screen.getByPlaceholderText('write author here');
  const urlInput = screen.getByPlaceholderText('write url here');
  const sendButton = screen.getByText('Create');

  await user.type(titleInput, 'first title');
  await user.type(authorInput, 'first author');
  await user.type(urlInput, 'http://google.com');
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('first title');
  expect(createBlog.mock.calls[0][0].author).toBe('first author');
  expect(createBlog.mock.calls[0][0].url).toBe('http://google.com');
});
