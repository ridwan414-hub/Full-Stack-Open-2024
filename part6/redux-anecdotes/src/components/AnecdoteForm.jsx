import { useDispatch } from 'react-redux';
import { createAction } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch()
     
    const createAnecdote = (e) => {
       e.preventDefault();
       const content = e.target.data.value;
       e.target.data.value = '';
       dispatch(createAction(content));
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