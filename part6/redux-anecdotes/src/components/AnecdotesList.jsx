/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { votingAction } from "../reducers/anecdoteReducer";

const Anecdote = ({anecdote,handleVote}) => {
    return (
        <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={handleVote} >
                vote
              </button>
            </div>
          </div>
    )
}

const AnecdotesList = () => {
    const anecdotes = useSelector((state) => state);
    const dispatch = useDispatch()
    
    return (
      <div>
        {anecdotes.map((anecdote) => (
            <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleVote={() => dispatch(votingAction(anecdote.id))} 
            />))
        }
      </div>
    );
};

export default AnecdotesList;