import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS } from './queries';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommend from './components/Recommend';

const App = () => {
  const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };
  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };
  useEffect(() => {
    const localKey = localStorage.getItem('library-user-token');
    localKey && setToken(localKey);
  }, []);
  if (authors.loading || books.loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>log in</button>
        )}
      </div>

      <Authors
        authors={authors.data.allAuthors}
        show={page === 'authors'}
        authenticated={token}
      />

      <Books books={books.data.allBooks} show={page === 'books'} />
      <NewBook setError={notify} show={page === 'add'} />
      <Recommend show={page === 'recommend'} books={books.data.allBooks} />
      <LoginForm
        setToken={setToken}
        setPage={setPage}
        setError={notify}
        show={page === 'login'}
      />
    </div>
  );
};

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>;
};
Notify.propTypes = {
  errorMessage: PropTypes.string,
};

export default App;
