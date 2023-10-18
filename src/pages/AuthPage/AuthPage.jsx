import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import './AuthPage.css';
import { Button } from '@material-tailwind/react';

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  function closeComponent() {
    setShowSignUp(false);
    setShowLogin(false);
  };

  return (
    <>
      <video playsInline autoPlay muted loop id="video-background">
        <source src="../../Images/bgvid.mp4" type="video/mp4"/>
      </video>
      <main className='landing-page'>
        <img src="../../Images/spottr-white.svg" alt="logo" className='logo1'/>
        <div className="description">
          <h1>
          "By prioritizing the power of positive relationships, we seek to make fitness not only a personal goal but a shared journey. Together, we'll inspire and uplift each other, one workout, one goal, and one connection at a time. Welcome to a place where companionship meets commitment, where a shared goal becomes a shared achievement, and where you'll find your 'spotter' for life"
          </h1>
        </div>
        <div>
          <Button className='auth-btn' color='red' variant='gradient' ripple={true} onClick={() => setShowLogin(true)}>Log In</Button>
          <Button className='auth-btn' color='white' ripple={true} onClick={() => setShowSignUp(true)}>Sign Up</Button>
          {showSignUp && <SignUpForm setUser={setUser} onClose={closeComponent} />}
          {showLogin && <LoginForm setUser={setUser} onClose={closeComponent} />}
        </div>
      </main>
    </>
  );
}