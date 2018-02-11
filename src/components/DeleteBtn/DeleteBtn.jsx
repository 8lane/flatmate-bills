import React from 'react'

const DeleteBtn = ({ onDelete }) => {
  return <button className="delete-btn" type="button" onClick={onDelete}>&times;</button>
}

export default DeleteBtn