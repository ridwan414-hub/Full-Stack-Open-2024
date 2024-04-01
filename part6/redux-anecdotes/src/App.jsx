import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAnecdotes} from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdotesList from './components/AnecdotesList';
import Filter from './components/Filter';
import Notification from './components/Notification';
const App = () => {

  
  const dispatch = useDispatch()
  useEffect(() => { 
    dispatch(initializeAnecdotes())
  }, [dispatch])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification></Notification>
      <Filter></Filter>
      <AnecdotesList></AnecdotesList>
      <AnecdoteForm></AnecdoteForm>
    </div>
  );
};

export default App;
