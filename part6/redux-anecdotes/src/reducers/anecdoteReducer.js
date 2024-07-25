import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"


const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload.id
      const anecdoteToChange = state.find(note => note.id === id)
      const changedAncdotes = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return state.map(note =>
        note.id !== id ? note : changedAncdotes
      )
    },
    appendAnecdotes(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { setAnecdotes, appendAnecdotes,voteAnecdote } = anecdotesSlice.actions

export const votingAnecdotes = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch(voteAnecdote(updatedAnecdote))
  }
}

export const createAnecdotes = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdotes(newAnecdote));
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export default anecdotesSlice.reducer