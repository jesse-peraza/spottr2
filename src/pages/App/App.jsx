import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import HomePage from '../HomePage/HomePage';
import NavBar from '../../components/NavBar/NavBar';
import CreateProfilePage from '../CreateProfilePage/CreateProfilePage';
import ProfilePage from '../ProfilePage/ProfilePage';
import MatchPage from '../MatchPage/MatchPage';

export default function App() {
  const [user, setUser] = useState(getUser());
  const [profile, setProfile] = useState({})

  return (
    <main className="App">
      { user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              <Route path="/" element={<HomePage user={user} setProfile={setProfile}/>} />
              <Route path="/profile/create" element={<CreateProfilePage user={user}/>}></Route>
              <Route path="/profile" element={<ProfilePage />}></Route>
              <Route path="/matches" element={<MatchPage />}></Route>
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
