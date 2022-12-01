import React from 'react';

const Header = ({boardName}) => {

  return (
    <>
    <div>{boardName}</div>
    <input type="button" value='+' />
    </>
  )
}

export default Header