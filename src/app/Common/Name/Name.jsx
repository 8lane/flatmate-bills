import React from 'react'

const Name = ({ firstName, lastName }) => {
  return (
    <strong className="name">{firstName} {lastName}</strong>
  )
}

export default Name