import { Link } from 'react-router-dom';
import { useState } from 'react';
import * as userService from '../../utilities/users-service';
import { IconButton, Drawer } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faComments } from '@fortawesome/free-solid-svg-icons'
import './NavBar.css'
import MatchPage from '../../pages/MatchPage/MatchPage';
import ProfileNav from '../ProfileNav/ProfileNav';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  const [openRight, setOpenRight] = useState(false)
  const [openLeft, setOpenLeft] = useState(false)
  const openDrawerRight = () => setOpenRight(true)
  const openDrawerLeft = () => setOpenLeft(true)
  const closeDrawerRight = () => setOpenRight(false)
  const closeDrawerLeft = () => setOpenLeft(false)

  return (
    <nav className='header'>
        <IconButton className="rounded-full" size="lg" onClick={openDrawerLeft}>
          <FontAwesomeIcon icon={faUser} style={{color: "#000000",}} />
        </IconButton>
        <Drawer
        placement='left'
        open={openLeft}
        onClose={closeDrawerLeft}
        className='p-5'
        >
        <ProfileNav closeDrawerLeft={closeDrawerLeft} setUser={setUser}/>  
        </Drawer>
      <Link to="/">
        <img src="../../Images/spottr.svg" alt="logo" className='logo2'/>
      </Link>
      <IconButton className="rounded-full" size="lg" onClick={openDrawerRight}>
        <FontAwesomeIcon icon={faComments} style={{color: "#000000",}} />
      </IconButton>
      <Drawer
        placement='right'
        open={openRight}
        onClose={closeDrawerRight}
        className='p-5'
        size={550}
      >
        <MatchPage closeDrawerRight={closeDrawerRight}/>  
      </Drawer>
    </nav>
  );
}