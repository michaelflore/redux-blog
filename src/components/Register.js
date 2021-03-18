import React, {Component} from 'react';
import {Redirect} from "react-router-dom";

class Register extends Component {

    state = {
        email: '',
        password: '',
        redirect: false
    }

    handleRegister = e => {
        e.preventDefault();
        this.props.onRegister(this.state.email, this.state.password);
        this.setState({ ...this.state, redirect: true })
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to="/login"/>
        }
        return (
            <div className="form-container">
                <div className="form-inner">
                    <h2>Register</h2>
                    <form onSubmit={this.handleRegister} name="register">
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input type="text" name="email" onChange={e => this.setState({ email: e.target.value })}
                                   placeholder="Email..." required={true}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password: </label>
                            <input type="text" name="password" onChange={e => this.setState({ password: e.target.value })}
                                   placeholder="Password..." required={true}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" disabled={!this.state.email && !this.state.password}>
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;