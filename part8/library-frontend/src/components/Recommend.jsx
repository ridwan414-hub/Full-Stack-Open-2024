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
  if (!favoriteGenre) {
    return <div className="text-gray-500">Genre loading...</div>;
  }
  if (!books) {
    return <div className="text-gray-500">Books loading...</div>;
  }
  if (user === null) {
    return <div className="text-gray-500">User loading...</div>;
  }

  const filteredBook = books.filter((book) =>
    book.genres.includes(favoriteGenre)
  );

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
      <p className="mb-4">
        Books in your favorite genre: <strong>{favoriteGenre}</strong>
      </p>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Author</th>
            <th className="py-2 px-4 border-b">Published</th>
          </tr>
        </thead>
        <tbody>
          {filteredBook.map((a) => (
            <tr key={a.title} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{a.title}</td>
              <td className="py-2 px-4 border-b">{a.author.name}</td>
              <td className="py-2 px-4 border-b">{a.published}</td>
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
