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
  uniqueGenres.push('all genres');

  const filteredBook = books.filter((book) => {
    if (filter === 'all genres') {
      return true;
    }
    return book.genres.includes(filter);
  });

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <strong>{filter}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBook.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {uniqueGenres.map((genre) => (
          <button key={genre} onClick={() => setFilter(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};
Books.propTypes = {
  show: PropTypes.bool.isRequired,
  books: PropTypes.array.isRequired,
};
export default Books;
