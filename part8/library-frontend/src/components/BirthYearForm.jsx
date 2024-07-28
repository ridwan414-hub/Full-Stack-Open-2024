import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { EDIT_AUTHOR } from '../queries';
import { useMutation } from '@apollo/client';
import { updateAuthorsCache } from '../utils/updateCache';

const BirthYearForm = ({ authors, setError }) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
    update: (cache, response) => {
      const editedAuthor = response.data.editAuthor;
      updateAuthorsCache(cache, editedAuthor);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    editAuthor({ variables: { name, born: Number(born) } });
    setBorn('');
    setName('');
  };

  return (
    <div className="mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Set Birth Year</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <select
            value={name}
            onChange={({ target }) => setName(target.value)}
            className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="" disabled>
              Select author
            </option>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Born
          </label>
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
            className="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Author
        </button>
      </form>
    </div>
  );
};

BirthYearForm.propTypes = {
  authors: PropTypes.array.isRequired,
  setError: PropTypes.func.isRequired,
};

export default BirthYearForm;
