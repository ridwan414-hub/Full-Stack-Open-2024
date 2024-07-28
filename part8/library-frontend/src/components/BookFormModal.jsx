import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { ALL_AUTHORS, CREATE_BOOK } from '../queries';
import { useMutation } from '@apollo/client';
import { updateBooksCache } from '../utils/updateCache';

const BookFormModal = ({ setError, closeModal }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
    update: async (cache, response) => {
      const addedBook = response.data.bookAdded;
      updateBooksCache(cache, addedBook);
    },
  });
  const submit = async (event) => {
    event.preventDefault();
    createBook({
      variables: { title, author, published: parseInt(published), genres },
    });
    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
    setGenre('');
    closeModal();
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700"
            >
              Author
            </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              htmlFor="published"
              className="block text-sm font-medium text-gray-700"
            >
              Published
            </label>
            <input
              id="published"
              type="number"
              value={published}
              onChange={({ target }) => setPublished(target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              htmlFor="genre"
              className="block text-sm font-medium text-gray-700"
            >
              Genre
            </label>
            <input
              id="genre"
              type="text"
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              onClick={addGenre}
              type="button"
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Genre
            </button>
          </div>
          <div className="flex justify-start items-center">
            <label className="block text-sm font-medium text-gray-700">
              Genre : &nbsp;
            </label>
            <div className="flex flex-wrap gap-2">{genres.join(', ')}</div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Book
            </button>
            <button
              onClick={closeModal}
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
BookFormModal.propTypes = {
  setError: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default BookFormModal;
