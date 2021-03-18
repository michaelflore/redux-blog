import React, {Component} from 'react';

import appService from "../appService";
class MyPosts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myPosts: []
        }
    }

    componentDidMount() {
        appService.getMyPosts(this.props.match.params.userId, (data) => this.setState({ myPosts: data }))
    }

    render() {
        return (
            <div>
                <h1>My Posts</h1>
                {
                    this.state.myPosts.map((post, i) => {
                        return (
                            <div key={i}>{post.title}</div>
                        )
                    })
                }
            </div>
        );
    }
}

export default MyPosts;