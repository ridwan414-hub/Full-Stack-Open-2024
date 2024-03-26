/* eslint-disable linebreak-style */
import PropType from 'prop-types'
import React from 'react'
const error = {
  color: 'red',
  background: 'lightgrey',
  border: 'solid 5px',
  border_radius: 5,
  padding: 10,
  margin_bottom: 10,
}

const success = {
  color: 'green',
  background: 'lightgrey',
  border_radius: '10px',
  border: 'solid 5px',
  padding: 10,
  margin_bottom: 10,
}
const Notification = ({ successMessage, errorMessage }) => {
  if (errorMessage === null && successMessage === null) {
    return null
  } else if (successMessage) {
    return <div id='success' style={success}>{successMessage}</div>
  } else if(errorMessage) {
    return <div id='error' style={error}>{errorMessage}</div>
  }
}
Notification.propType = {
  successMessage: PropType.string.isRequired,
  errorMessage: PropType.string.isRequired,
}
export default Notification
