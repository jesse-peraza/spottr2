import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import { Input, Button, Typography, IconButton } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

export default function LoginForm({ setUser, onClose }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  function stopClose(evt) {
    evt.stopPropagation();
  };

  return (
    <div className="form-overlay" onClick={onClose}>
      <div className="form-container" onClick={stopClose}>
        <IconButton className="rounded-full close-btn" size="sm" variant="text" onClick={onClose}>
          <FontAwesomeIcon icon={faX} style={{color: "#cc0000",}} />
        </IconButton>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
        Enter your details to login.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 input-container" autoComplete="off" onSubmit={handleSubmit} onClick={stopClose}>
          <div className="mb-5 flex flex-col gap-6">
            <Input type="text" label="Email" size="lg" name="email" value={credentials.email} onChange={handleChange} required />
            <Input type="password" label="Password" size="lg" name="password" value={credentials.password} onChange={handleChange} required />
          </div>
          <Button variant='gradient' ripple={true} type="submit">LOG IN</Button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}