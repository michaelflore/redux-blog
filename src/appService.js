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
                    content: posts[post].content,
                    user: posts[post].user
                });
            }

            cb(newStatePosts)
        });
    }

    //My Posts
    getMyPosts = (userId, cb) => {
        const myPosts = firebase.database().ref("posts").orderByChild("user").equalTo(userId)
        myPosts.on("value", snapshot => {
            const posts = snapshot.val();
            console.log("Returned" + posts)
            const returnedPosts = [];

            for(let post in posts) {
                returnedPosts.push({
                    key: post,
                    slug: posts[post].slug,
                    title: posts[post].title,
                    content: posts[post].content
                })
            }

            cb(returnedPosts)
        })
    }

    getNewSlugFromTitle = (title) => {
        const newTitle = encodeURI(title.toLowerCase().split(" ").join("-"));

        return newTitle;
    }

    savePost = post => {
        return firebase.database().ref(`posts`).push({
            ...post,
            slug: this.getNewSlugFromTitle(post.title),
            user: firebase.auth().currentUser.uid
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