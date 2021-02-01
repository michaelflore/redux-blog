import React from 'react';
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

function Post(props) {
    const converter = new QuillDeltaToHtmlConverter(props.post.content.ops, {});
    const contentHTML = converter.convert();

    return (
        <article className="posts-container">
            <div className="post-content">
                <h1>{props.post.title}</h1>
                <div className="content" dangerouslySetInnerHTML={{ __html: contentHTML }}/>
            </div>
        </article>
    );
}

export default Post;