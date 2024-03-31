import { useDispatch } from 'react-redux';
import { createAnecdotes } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch()
     
    const createAnecdote = (e) => {
       e.preventDefault();
       const content = e.target.data.value;
       e.target.data.value = '';
      dispatch(createAnecdotes(content));
      dispatch(setNotification(`you added ${content}`, 5));
     };
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={createAnecdote}>
          <div>
            <input name="data" type="text" />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    );
};

export default AnecdoteForm;