import React, {useState} from 'react';
import AddTaskModal from '../AddTaskModal/AddTaskModal';

const Header = ({boardName}) => {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  return (
    <div>
    <p>{boardName}</p>
    <input type="button" value='+' onClick={() => setShowAddTaskModal(true)} />
    {showAddTaskModal && <AddTaskModal boardName={boardName} setShowAddTaskModal={setShowAddTaskModal}/>}
    </div>
  )
}

export default Header