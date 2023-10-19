import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import { IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faComments } from '@fortawesome/free-solid-svg-icons'
import './NavBar.css'

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className='header'>
      <Link to='/profile'>
        <IconButton className="rounded-full" size="lg">
          <FontAwesomeIcon icon={faUser} style={{color: "#000000",}} />
        </IconButton>
      </Link>
      <Link to="/">
        <img src="../../Images/spottr.svg" alt="logo" className='logo2'/>
      </Link>
      <Link>
        <IconButton className="rounded-full" size="lg">
          <FontAwesomeIcon icon={faComments} style={{color: "#000000",}} />
        </IconButton>
      </Link>
      <Link to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}