import { useState } from 'react';
import { signUp } from '../../utilities/users-service';
import { Input, Button, Typography, IconButton } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

export default function SignUpForm({ setUser, onClose }){
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate()
  function handleChange (evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const {name, email, password} = credentials;
      const formData = {name, email, password};
      // The promise returned by the signUp service
      // method will resolve to the user object included
      // in the payload of the JSON Web Token (JWT)
      const user = await signUp(formData);
      setUser(user);
      navigate('/profile/create')
    } catch {
      // An error occurred
      // Probably due to a duplicate email
      setError('Sign Up Failed - Try Again');
    }
  };

  function stopClose(evt) {
    evt.stopPropagation();
  };

  const disable = credentials.password !== credentials.confirm;

  return (
    <div className="form-overlay" onClick={onClose}>
      <div className="form-container" onClick={stopClose}>
        <IconButton className="rounded-full close-btn" size="sm" variant="text" onClick={onClose}>
          <FontAwesomeIcon icon={faX} style={{color: "#cc0000",}} />
        </IconButton>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
        Enter your details to sign up.
        </Typography>
        <form className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96 input-container" autoComplete="off" onSubmit={handleSubmit} onClick={stopClose}>
          <div className="mb-5 flex flex-col gap-5">
            <Input label="Name" type="text" name="name" value={credentials.name} onChange={handleChange} required />
            <Input label="Email" type="email" name="email" value={credentials.email} onChange={handleChange} required />
            <Input label="Password"type="password" name="password" value={credentials.password} onChange={handleChange} required />
            <Input label="Confirm" type="password" name="confirm" value={credentials.confirm} onChange={handleChange} required />
          </div>
          <Button variant='gradient' ripple={true} type="submit" disabled={disable}>SIGN UP</Button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}