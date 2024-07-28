import { PropTypes } from 'prop-types';
import { useState } from 'react';

const Books = (props) => {
  const [filter, setFilter] = useState('all genres');
  if (!props.show) {
    return null;
  }

  const books = props.books;

  const allGenres = books.map((book) => book.genres).flat();
  const uniqueGenres = [...new Set(allGenres)];
  uniqueGenres.unshift('all genres');

  const filteredBook = books.filter((book) => {
    if (filter === 'all genres') {
      return true;
    }
    return book.genres.includes(filter);
  });

  return (
    <div className="mx-auto p-4">
      <h2 className="text-2xl text-center font-bold mb-4">Books</h2>
      <p className="mb-4 text-center">
        in genre <strong>{filter}</strong>
      </p>
      <div className="flex justify-center items-start gap-4">
        <div className="w-5/6">
          <table className="min-w-full bg-white shadow-md text-center rounded-lg overflow-hidden">
            <tbody>
              <tr className="bg-gray-800 text-white">
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Author</th>
                <th className="py-2 px-4">Published</th>
              </tr>
              {filteredBook.map((book) => (
                <tr key={book.title} className="border-b">
                  <td className="py-2 px-4">{book.title}</td>
                  <td className="py-2 px-4">{book.author.name}</td>
                  <td className="py-2 px-4">{book.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-1/6">
          <label className="block bg-gray-700 rounded-lg text-sm py-2 px-4 text-center text-white font-bold mb-2">
            Filter by genre
          </label>
          <div className="flex flex-wrap gap-2">
            {uniqueGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => setFilter(genre)}
                className={`py-2 px-4 rounded focus:outline-none ${
                  filter === genre
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Books.propTypes = {
  show: PropTypes.bool.isRequired,
  books: PropTypes.array.isRequired,
};

export default Books;
