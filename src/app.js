// import the module
import { http } from './http';
import { ui } from './ui';

// get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add Post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete Post
document.querySelector('#posts').addEventListener('click', deletePost);

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
      ui.showAlert('Post Added', 'alert alert-success');
      ui.clearFields();
      getPosts();
    })
    .catch((err) => console.log(err));
}

// Delete Post
function deletePost(e) {
  e.preventDefault();
  // check event
  if (e.target.parentElement.classList.contains('delete')) {
    // get id
    const id = e.target.parentElement.dataset.id;
    // prompt alert
    if (confirm('Are you sure?')) {
      // delete the post
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then((data) => {
          // show success msg
          ui.showAlert('Post Removed', 'alert alert-success');
          // display remaining post
          getPosts();
        })
        // catch eror if any
        .catch((err) => console.log(err));
    }
  }
}
