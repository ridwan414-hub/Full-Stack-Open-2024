import PropTypes from 'prop-types';
import BirthYearForm from './BirthYearForm';

const Authors = (props) => {
  const authenticated = localStorage.getItem('library-user-token');
  if (!props.show) {
    return null;
  }
  const authors = props.authors;

  return (
    <div className="flex justify-center items-center">
      {authenticated ? (
        <div className="w-2/5">
          <BirthYearForm authors={authors} setError={props.setError} />
        </div>
      ) : null}
      <div className="container text-center mx-auto p-4">
        <h2 className="text-2xl  font-bold mb-4">Authors</h2>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/3 py-2 px-4">Name</th>
              <th className="w-1/3 py-2 px-4">Born</th>
              <th className="w-1/3 py-2 px-4">Books</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((a) => (
              <tr key={a.name} className="border-b">
                <td className="py-2 px-4">{a.name}</td>
                <td className="py-2 px-4">{a.born}</td>
                <td className="py-2 px-4">{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Authors.propTypes = {
  show: PropTypes.bool.isRequired,
  authors: PropTypes.array.isRequired,
  setError: PropTypes.func.isRequired,
};

export default Authors;
