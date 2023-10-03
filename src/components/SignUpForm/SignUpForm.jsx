import { Component } from 'react'; 
import { useNavigate } from 'react-router-dom';
import {signUp} from '../../utilities/users-service'

export default class SignUpForm extends Component {
    // class fields approach for setting the state 
    state = {
        name: '', 
        email: '', 
        password: '', 
        confirm: '', 
        error: ''
    }
    // navigate = useNavigate()
    // 2 ways to set a method's "this" keyword correctly: JS 'bind' method in the constructor or the class fields syntax 
    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value, 
            error: ''
        })
    }

    handleSubmit = async (evt) => {
        evt.preventDefault()
        
        try {
            const formData = {...this.state}
            delete formData.error
            delete formData.confirm

            const user = await signUp(formData)
            // this.props.setUser(user)
            // this.navigate('/orders')
            this.props.setUser(user)
        } catch {
            this.setState({ error: 'Sign Up Failed - Try Again' })
        }
    }


    //class based components need to have a render function instead of just returning the stuff that we want to render 
    render () {
        const disable = this.state.password !== this.state.confirm;
        return (
            <div>
                <div className="form-container">
                    <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
                    <label>Email</label>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                    <label>Password</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                    <label>Confirm</label>
                    <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                    <button type="submit" disabled={disable}>SIGN UP</button>
                    </form>
                </div>
                <p className="error-message">&nbsp;{this.state.error}</p>
            </div>
        )
    }
}