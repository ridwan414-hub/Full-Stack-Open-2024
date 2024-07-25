/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useState } from 'react'
import {Button} from 'react-bootstrap'
const Toggleable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant='dark' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})
Toggleable.displayName='Toggleable'
Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
export default Toggleable
      // const BlogsFormRef = useRef();
      // <Toggleable buttonLabel="new note" ref={BlogsFormRef}>
      //   <BlogForm></BlogForm>
      // </Toggleable>;