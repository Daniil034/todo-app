import React from 'react';
import logo from '../../assets/logo-mobile.svg';
import './AllBoardsHeader.scss';

const AllBoardsHeader = ({setShowAddBoardModal}) => {
  return (
    <div className='boards-header'>
        <div className="boards-header__logo">
            <img className='boards-header__img' src={logo} alt="company logo" />
            <h1 className='boards-header__title'>UpTrader</h1>
        </div>
        <button className="boards-header__button" type='button' onClick={() => setShowAddBoardModal(true)}>+ Add New Board</button>
    </div>
  )
}

export default AllBoardsHeader