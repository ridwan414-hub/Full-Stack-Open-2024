import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { LOGGEDIN_USER } from '../queries';

const Recommend = ({ show, books }) => {
  const loggedInUser = useQuery(LOGGEDIN_USER);
  const user = loggedInUser.data ? loggedInUser.data.me : null;
  const favoriteGenre = user ? user.favoriteGenre : null;
  if (!show) {
    return null;
  }

  const filteredBook = books.filter((book) =>
    book.genres.includes(favoriteGenre)
  );

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genres <strong>{favoriteGenre}</strong>
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
    </div>
  );
};

Recommend.propTypes = {
  show: PropTypes.bool.isRequired,
  books: PropTypes.array.isRequired,
};

export default Recommend;
