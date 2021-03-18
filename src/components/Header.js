import React from 'react';
import { Link } from "react-router-dom";

import firebase from "./../firebase";

function Header(props) {
    return (
        <header className="App-header">
            <ul className="container">
                <div>
                    <li className="list-item">
                        <Link to="/" className="App-title">Redux Blog</Link>
                    </li>
                </div>
                {
                    props.isAuthenticated ? (
                        <div>
                            <li className="list-item">
                                <Link to="/" className="App-link">Home</Link>
                            </li>
                            <li className="list-item">
                                <Link to="/new" className="App-link">New Post</Link>
                            </li>
                            <li className="list-item">
                                <Link to={"/myPosts/" + firebase.auth().currentUser.uid} className="App-link">My Posts</Link>
                            </li>
                            <li className="list-item">
                                <button onClick={ e => {
                                    e.preventDefault();
                                    props.onLogout();
                                }} className="btn">Logout</button>
                            </li>
                        </div>
                    ) : (
                        <div>
                            <li className="list-item">
                                <Link to="/login" className="App-link">Login</Link>
                            </li>
                            <li className="list-item">
                                <Link to="/register" className="App-link">Register</Link>
                            </li>
                        </div>
                    )
                }
            </ul>
        </header>
    );
}

export default Header;