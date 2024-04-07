/* eslint-disable linebreak-style */
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
// const error = {
//   color: 'red',
//   background: 'lightgrey',
//   border: 'solid 5px',
//   border_radius: 5,
//   padding: 10,
//   margin_bottom: 10,
// };

// const success = {
//   color: 'green',
//   background: 'lightgrey',
//   border_radius: '10px',
//   border: 'solid 5px',
//   padding: 10,
//   margin_bottom: 10,
// };
const Notification = () => {
  const successMessage = useSelector((state) => state.notification);
  if (successMessage === null) {
    return null;
  } else if (successMessage) {
    return <Alert variant="success">{successMessage}</Alert>;
  }
  //  else if(errorMessage) {
  //   return <div id='error' style={error}>{errorMessage}</div>
  // }
};

export default Notification;
