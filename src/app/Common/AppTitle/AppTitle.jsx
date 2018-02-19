import React from 'react'

const AppTitle = ({ editMode }) => {
  return !editMode ? '🏠 25 Northways Bills' : '💸 Create new bill'
}

AppTitle.defaultProps = {
  editMode: false
}

export default AppTitle