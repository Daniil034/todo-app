import React from 'react';
import {useSelector} from 'react-redux';
import { selectCurrentBoard } from '../../routes/currentBoard/currentBoardSlice';

const CurrentBoardName = () => {
    const {name: currentBoardName} = useSelector(selectCurrentBoard)

  return (
    <div>{currentBoardName}</div>
  )
}

export default CurrentBoardName