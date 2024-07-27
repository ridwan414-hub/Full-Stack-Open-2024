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
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};
BirthYearForm.propTypes = {
  authors: PropTypes.array.isRequired,
  setError: PropTypes.func.isRequired,
};
export default BirthYearForm;
