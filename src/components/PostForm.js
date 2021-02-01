import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import Quill from "react-quill";
import "react-quill/dist/quill.snow.css";

class PostForm extends Component {
    state = {
        post: {
            key: this.props.post.key,
            slug: this.props.post.slug,
            title: this.props.post.title,
            content: this.props.post.content
        },
        saved: false
    }

    handlePostForm = e => {
        e.preventDefault();
        if(this.state.post.title) {
            if(this.props.updatePost) {
                this.props.updatePost(this.state.post);
            } else {
                this.props.addNewPost(this.state.post);
            }
            this.setState({ saved: true });
        } else {
            alert("Title Required");
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.post.key !== this.props.post.key) {
            this.setState({
                    post: {
                        key: this.props.post.key,
                        slug: this.props.post.slug,
                        title: this.props.post.title,
                        content: this.props.post.content
                }
            });

            const editor =  document.getElementsByClassName("ql-editor")[0];
            editor.innerHTML = '';
        }
    }

    render() {
        if(this.state.saved === true) {
            return <Redirect to="/" />
        }
        return (
            <div className="form-container">
                <div className="form-inner">
                    <form onSubmit={this.handlePostForm}>
                        <h1>{this.state.post.key ? 'Update Post' : 'Add Post'}</h1>
                        <div className="form-group">
                            <label htmlFor="form-title">Title: </label>
                            <input id="form-title" value={this.state.post.title}
                                   onChange={e => this.setState({
                                       post: {
                                           ...this.state.post,
                                           title: e.target.value
                                       }
                                   })}
                                   defaultValue={this.props.title} />
                        </div>
                        <div className="content-label">
                            <label htmlFor="form-content">Content:</label>
                        </div>
                        <Quill defaultValue={this.state.post.content} onChange={(content, delta, source, editor) => {
                            this.setState({
                                post: {
                                    ...this.state.post,
                                    content: editor.getContents()
                                }
                            });
                        }}
                        />
                        <p>
                            <button type="submit" className="btn">{this.state.post.key ? 'Update' : 'Add'}</button>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default PostForm;