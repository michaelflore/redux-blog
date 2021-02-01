import React from 'react';
import {Link} from "react-router-dom";
import logo from "../logo.svg";
import Message from "./Message";

function Posts(props) {

    return (
        <article className="posts-container">
            {props.message && <Message type={props.message}/>}
            <h1 id="heading">List of Posts</h1>
            <ul className="posts-list">
                {
                    props.posts.length < 1 && (<li key="empty" className="posts-item">No Posts!</li>)
                }
                {
                    props.posts.map(function (post) {
                        return (
                            <li key={post.slug} className="posts-item">
                                <div className="image-container">
                                    <img src={logo} alt="logo"/>
                                </div>
                                <div className="posts-title">
                                    <h2>
                                        <Link to={`/post/${post.slug}`} className="posts-link">{post.title}</Link>
                                    </h2>
                                    {
                                        props.isAuthenticated && (
                                            <p>
                                                <Link to={`/edit/${post.slug}`} className="App-link">Edit Post</Link>
                                                {" | "}
                                                <button className="btn btn-danger" onClick={() => props.deletePost(post)}>Delete</button>
                                            </p>
                                        )
                                    }
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </article>
    );
}

export default Posts;