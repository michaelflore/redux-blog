import React from 'react';
import { Link } from "react-router-dom";

function NotFound(props) {
    return (
        <article className="not-found container">
            <h1>404!</h1>
            <p>Content Not Found</p>
            <Link to="/">Back To Posts</Link>
        </article>
    );
}

export default NotFound;