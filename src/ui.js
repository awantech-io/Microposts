class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.forState = 'add';
  }

  // show post method
  showPosts(posts) {
    let output = '';

    posts.forEach((post) => {
      output += `
          <div class="card mb-3">
          <div class="card-body">
          <h4 class="card-title">${post.title}</h4>
          <p class="card-text">${post.body}</p>
           <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>

          <a href="#" class="delete card-link" data-id="${post.id}">
          <i class="fa fa-remove"></i>
          </a>

          </div>
          </div>
          `;
    });
    this.post.innerHTML = output;
  }

  showAlert(message, className) {
    this.clearAlert();

    // Create Div
    const div = document.createElement('div');

    // Add classes
    div.className = className;

    // Add text
    div.appendChild(document.createTextNode(message));

    // Get Parent
    const container = document.querySelector('.postsContainer');

    // Get Posts
    const posts = document.querySelector('#posts');

    // Insert alert div
    container.insertBefore(div, posts);

    // Timeout
    setTimeout(() => {
      this.clearAlert();
    }, 3000); 
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  // fill form to edit
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;
    
    this.changeFormState('edit');
  }
  
  // clearIdInput();
  clearIdInput(){
    this.idInput.value = '';
  }
  // change form state
  changeFormState(type){
    if (type === 'edit'){
      // create edit button
      this.postSubmit.textContent = "Update Post";
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';

      // create cancel button
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn-block';
      button.appendChild(document.createTextNode('Cancel Edit'));

      // Get parent
      const cardForm = document.querySelector('.card-form');
      // Get element to insert before
      const formEnd = document.querySelector('.form-end');
      // Insert cancel button
      cardForm.insertBefore(button, formEnd);
    } else {
      // change back to Post it button
      this.postSubmit.textContent = "Post It";
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';

      // remove cancel button
      if(document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }
      // clear id from hidden field
      this.clearIdInput();
      // clear text
      this.clearFields();


    }
  }
}

export const ui = new UI();
