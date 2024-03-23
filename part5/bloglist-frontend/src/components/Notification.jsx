import React from 'react';
const error = {
  color: 'red',
  background: 'lightgrey',
  border: 'solid 5px',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10,
};

const success = {
  color: 'green',
  background: 'lightgrey',
  border_radius: '10px',
  border: 'solid 5px',
  padding: 10,
  margin_bottom: 10,
};
const Notification = ({ successMessage, errorMessage }) => {
    if (errorMessage == null && successMessage == null) {
        return null
    }
    else if (successMessage) {
        return (
            <div style={success}>
                {successMessage}
            </div>
        )
    }
    else {
        return (
            <div style={error}>
                {errorMessage}
            </div>
        )
    }
}

export default Notification;