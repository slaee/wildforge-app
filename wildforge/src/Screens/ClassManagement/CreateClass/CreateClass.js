import { useState } from 'react'
import Navbar from '../../../Utils/Nav/Navbar'
import './CreateClass.scss'
import CreateButton from '../../../Utils/Button/CreateButton';
import Search from '../../../Utils/Search/Search';
import Card from '../../../Utils/Cards/Card';
import CreateClassDetails from './CreateClassDetails';

function CreateClass() {
  const buttons = [
      { id: 1, label: 'My Classes', className: 'classes' },
      { id: 2, label: 'Peer Evaluation', className: 'peers' },
      { id: 3, label: 'My Profile', className: 'profile' },
      { id: 4, label: 'Logout', className: 'logout' }
    ];

    const [isCLicked, setIsClicked] = useState(false);

    const handleCreateButtonClick = () => {
      console.log('Create button clicked');
      setIsClicked(true);
    };

    const handleClickOut = () => {
      console.log('Create button clicked');
      setIsClicked(false);
    };

  return (
    <div className='class-container'>
      <Navbar buttons={buttons} />
      <div className='class-dashboard'>
        <div className='class-dashboard-header'>
          <div className='header-content'>
            <h1>Create Class</h1>
            <h2>Date</h2>
          </div>
          <Search placeholder={'Enter Class Info'}/>
          <CreateButton handlerOnClick={handleCreateButtonClick}/>
        </div>
        <div className='class-dashboard-body'>
          {isCLicked ? <CreateClassDetails handlerOnClick={handleClickOut}/> : null}
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  )
}

export default CreateClass