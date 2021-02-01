import React, {Component} from 'react';

class Login extends Component {
    state = {
        email: "",
        password: ""
    }

    handleLogin = e => {
        e.preventDefault();
        this.props.onLogin(this.state.email, this.state.password);
    }

    render() {
        return (
            <div className="form-container">
                <div className="form-inner">
                    <h2>Login</h2>
                    <form onSubmit={this.handleLogin} name="login">
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
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;