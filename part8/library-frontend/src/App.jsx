import { useEffect, useState } from 'react';
import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, AUTHOR_EDITED, BOOK_ADDED } from './queries';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommend from './components/Recommend';
import { updateAuthorsCache, updateBooksCache } from './utils/updateCache';
import Notify from './components/Notify';

const App = () => {
  const [page, setPage] = useState('books');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [token, setToken] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const client = useApolloClient();
  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      setSuccessMessage(`${addedBook.title} added`);
      updateBooksCache(client.cache, addedBook);
    },
  });
  useSubscription(AUTHOR_EDITED, {
    onData: ({ data, client }) => {
      const editedAuthor = data.data.authorEdited;
      setSuccessMessage(`${editedAuthor.name}'s birth year edited`);
      updateAuthorsCache(client.cache, editedAuthor);
    },
  });

  useEffect(() => {
    const localKey = localStorage.getItem('library-user-token');
    localKey && setToken(localKey);
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage('books');
  };

  if (authors.loading || books.loading) {
    return <div className="text-center">loading...</div>;
  }
  return (
    <div className="container mx-auto">
      <Notify
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        setSuccessMessage={setSuccessMessage}
        successMessage={successMessage}
      />
      <div className="flex justify-center space-x-4 my-4">
        <button
          className={`${
            page === 'authors' ? 'bg-blue-500' : 'bg-blue-300'
          } px-4 py-2 rounded`}
          onClick={() => setPage('authors')}
        >
          authors
        </button>
        <button
          className={`${
            page === 'books' ? 'bg-blue-500' : 'bg-blue-300'
          } px-4 py-2 rounded`}
          onClick={() => setPage('books')}
        >
          books
        </button>
        {token ? (
          <>
            <button
              className={`${
                page === 'add' ? 'bg-blue-500' : 'bg-blue-300'
              } px-4 py-2 rounded`}
              onClick={() => setIsModalOpen(true)}
            >
              add book
            </button>
            <button
              className={`${
                page === 'recommend' ? 'bg-blue-500' : 'bg-blue-300'
              } px-4 py-2 rounded`}
              onClick={() => setPage('recommend')}
            >
              recommend
            </button>
            <button className="bg-red-500 px-4 py-2 rounded" onClick={logout}>
              logout
            </button>
          </>
        ) : (
          <button
            className={`${
              page === 'login' ? 'bg-blue-500' : 'bg-blue-300'
            } px-4 py-2 rounded`}
            onClick={() => setPage('login')}
          >
            log in
          </button>
        )}
      </div>

      <Authors
        authors={authors.data.allAuthors}
        show={page === 'authors'}
        setError={setErrorMessage}
      />

      <Books books={books.data.allBooks} show={page === 'books'} />
      <NewBook
        setError={setErrorMessage}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
      <Recommend show={page === 'recommend'} books={books.data.allBooks} />
      <LoginForm
        setToken={setToken}
        setPage={setPage}
        setError={setErrorMessage}
        show={page === 'login'}
      />
    </div>
  );
};

export default App;
