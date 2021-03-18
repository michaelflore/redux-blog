import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import "./scss/App.scss"; //SASS
import Header from "./components/Header";
import Posts from "./components/Posts";
import Post from "./components/Post";
import PostForm from "./components/PostForm";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import MyPosts from "./components/MyPosts";

import firebase from "./firebase";

import appService from "./appService";

class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
          posts: [],
          message: null,
          isAuthenticated: false,
      }
    }

    //Set the type of message in state to render after each action
    displayMessage = (type) => {
        this.setState({
            message: type
        });
        setTimeout(() => {
            this.setState({ message: null });
        }, 1600);
    }

    renderAuthRoute = (Component, props) => {
        return this.state.isAuthenticated ? (<Component {...props} />) : (<Redirect to="/" />)
    }

    onRegister = (email, password) => {
        console.log(email, password);
        appService.register(email, password)
            .then(data => {
                firebase.database().ref(`users/${data.user.uid}`).push({
                    id: data.user.uid
                })
            })
            .catch(err => console.error(err));
    }

    onLogin = (email, password) => {
        console.log(email, password);
        appService.login(email, password)
            .then(user => this.setState({ isAuthenticated: true }))
            .catch(err => console.error(err));
    }

    onLogout = () => {
        appService.logout().then(() => this.setState({ isAuthenticated: false }));
    }

    addNewPost = post => {
        appService.savePost(post);
        this.displayMessage("saved");
        appService.subscribeToPosts((newStatePosts) => this.setState({ posts: newStatePosts }));
    }

    updatePost = post => {
        appService.updatePost(post);
        this.displayMessage("updated");
        appService.subscribeToPosts((newStatePosts) => this.setState({ posts: newStatePosts }));
    }

    deletePost = post => {
        if(window.confirm("Do you want to delete this post?")) {
            appService.deletePost(post);
            this.displayMessage("deleted");
            appService.subscribeToPosts((newStatePosts) => this.setState({ posts: newStatePosts }));
        }
    }

    componentDidMount() {
        appService.subscribeToPosts((newStatePosts) => this.setState({ posts: newStatePosts }));
    }

    render() {
        return (
            <Router>
                <div className="App">

                    <Header isAuthenticated={this.state.isAuthenticated} onLogout={this.onLogout}/>

                    <Switch>
                        <Route exact path="/" render={() => (
                            <Posts posts={this.state.posts}
                                   deletePost={this.deletePost}
                                   isAuthenticated={this.state.isAuthenticated}
                                   message={this.state.message}
                            />
                            )}
                        />

                        <Route path="/myPosts/:userId" component={MyPosts} />

                        <Route path="/post/:postSlug"
                            render={props => {
                                console.log(props)
                                const post = this.state.posts.find(post => post.slug === props.match.params.postSlug);
                                if(post) {
                                    return <Post post={post} />
                                } else {
                                    return <NotFound />
                                }
                            }}
                        />

                        <Route path="/new" render={() => {
                            return this.renderAuthRoute(PostForm, {
                                addNewPost: this.addNewPost,
                                post: {
                                    key: null,
                                    slug: "",
                                    title: "",
                                    content: ""
                                }
                            })
                        } } />

                        <Route path="/edit/:postSlug" render={props => {
                            const post = this.state.posts.find(post => post.slug === props.match.params.postSlug);

                            if(post) {
                                return this.renderAuthRoute(PostForm, {
                                    updatePost: this.updatePost,
                                    post
                                });
                            } else {
                                return <Redirect to="/" />
                            }
                        } }
                        />

                        <Route exact path="/login" render={() => {
                            return !this.state.isAuthenticated ? (
                                <Login onLogin={this.onLogin} />
                            ) : (
                                <Redirect to="/" />
                            )
                        } } />

                        <Route exact path="/register" render={() => {
                            return <Register onRegister={this.onRegister} />
                        } } />

                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;