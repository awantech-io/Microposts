// import the module
import { http } from './http';
import { ui } from './ui';

// get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add Post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Get Posts
function getPosts() {
  http
    .get('http://localhost:3000/posts')
    .then((data) => ui.showPosts(data))
    //.then((data) => console.log(data))
    .catch((err) => console.log(err));
}

// Submit Post
function submitPost() {
  // get form data
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  // change data to object literal
  const data = {
    title,
    body,
  };

  // Create Post
  http
    .post('http://localhost:3000/posts', data)
    .then((data) => {
      getPosts();
    })
    .catch((err) => console.log(err));
}
