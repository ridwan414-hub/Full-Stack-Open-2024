/* eslint-disable react/prop-types */
import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from '../reducers/commentReducer';
import CommentForm from './CommentForm';

const Comments = ({ id }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getComments(id))
    },[dispatch,id])
    const comments = useSelector((state) => state.comments);
    if(comments===null)return null
  return (
    <div>
          <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
        <CommentForm blogId={id}/>
    </div>
  );
};

export default Comments;
