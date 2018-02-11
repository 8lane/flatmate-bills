import React from 'react'

const DeleteBtn = ({ onDelete }) => {
  return <button className="delete-btn uk-button uk-button-text" type="button" onClick={onDelete}>&times;</button>
}

export default DeleteBtn