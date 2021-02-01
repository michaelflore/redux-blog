//firebase.js
import firebase from "./firebase";

class AppService {

    register(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

    login(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    logout() {
        return firebase.auth().signOut();
    }

    subscribeToPosts(cb) {
        const postsRef = firebase.database().ref("posts");
        postsRef.on("value", snapshot => {
            const posts = snapshot.val();
            console.log(posts)
            const newStatePosts = [];
            for(let post in posts) {
                newStatePosts.push({
                    key: post,
                    slug: posts[post].slug,
                    title: posts[post].title,
                    content: posts[post].content
                });
            }

            cb(newStatePosts)
        });
    }

    getNewSlugFromTitle = (title) => {
        const newTitle = encodeURI(title.toLowerCase().split(" ").join("-"));

        return newTitle;
    }

    savePost = post => {
        return firebase.database().ref("posts").push({
            ...post,
            slug: this.getNewSlugFromTitle(post.title)
        });
    }

    deletePost = post => {
        return firebase.database().ref(`posts/${post.key}`).remove();
    }

    updatePost = post => {
        return firebase.database().ref(`posts/${post.key}`).update({
            title: post.title,
            slug: this.getNewSlugFromTitle(post.title),
            content: post.content
        })
    }
};

export default new AppService();