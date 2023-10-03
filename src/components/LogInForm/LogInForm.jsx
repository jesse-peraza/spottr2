import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import * as usersServices from '../../utilities/users-service'

export default function LogInForm ({setUser}) {
    const [credentials, setCredentials] = useState({
        email: '', 
        password: ''
    })
    const [error, setError] = useState('')
    
    function handleChange(e) {
        setCredentials({...credentials, [e.target.name]: e.target.value})
        setError('')
    }
    
    async function handleSubmit (e) {
        e.preventDefault()
        try {
            const user = await usersServices.login(credentials)
            setUser(user)
        } catch {
            setError('Login Failed - Try Again')
        }
    }

    return (
        <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="text" name="email" value={credentials.email} onChange={handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
            <button type="submit">LOG IN</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{error}</p>
      </div>
    )
    }
