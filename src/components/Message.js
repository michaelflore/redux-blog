import React from 'react';

function Message({ type }) {

    const messages = {
        saved: "Post has been saved!",
        updated: "Post has been updated!",
        deleted: "Post has been deleted!"
    }

    return (
        <div className={`App-message ${type}`}>
            <p>
                <strong>{messages[type]}</strong>
            </p>
        </div>
    );
}

export default Message;