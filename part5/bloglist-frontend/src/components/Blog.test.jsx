import { render, screen } from "@testing-library/react"
import Blog from "./Blog"
import userEvent from "@testing-library/user-event";

test('Before clicking view button', () => {
    const testBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      user: {
        username: 'Ridwan414',
        name: 'Ridwan',
        id: '65fc03fb176f62b36165f223',
      },
      likes: 7,
    };
    const user = {
        username: 'Ridwan414'
    }
    const { container } = render(<Blog blog={testBlog} user={user} />)
    const div=container.querySelector('.beforeViewButton')
    expect(div).not.toHaveTextContent('https://reactpatterns.com/')
    expect(div).toHaveTextContent('React patterns by Michael Chan')
})
test('After clicking view button', async () => {
    const testBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      user: {
        username: 'Ridwan414',
        name: 'Ridwan',
        id: '65fc03fb176f62b36165f223',
      },
      likes: 7,
    };
    const user = {
      username: 'Ridwan414',
    };
    
   const {container}= render(<Blog blog={testBlog} user={user} />);
    
    const div = container.querySelector('.afterViewButton');
    
  expect(div).toHaveTextContent('https://reactpatterns.com/');
});
test('likes button click twice', async () => {
    const testBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      user: {
        username: 'Ridwan414',
        name: 'Ridwan',
        id: '65fc03fb176f62b36165f223',
      },
      likes: 7,
    };
    const user = {
      username: 'Ridwan414',
    };
    

  const mockHandler = vi.fn();

  render(<Blog blog={testBlog} user={user} updateLikedBlog={mockHandler} />);

  const users = userEvent.setup();
  const button = screen.getByText('like');
  await users.click(button);
  await users.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});