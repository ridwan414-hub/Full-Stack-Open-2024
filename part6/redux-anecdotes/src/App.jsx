import AnecdoteForm from './components/AnecdoteForm';
import AnecdotesList from './components/AnecdotesList';
import Filter from './components/Filter';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter></Filter>
      <AnecdotesList></AnecdotesList>
      <AnecdoteForm></AnecdoteForm>
    </div>
  );
};

export default App;
