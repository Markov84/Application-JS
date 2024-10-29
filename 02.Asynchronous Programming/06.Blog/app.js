function attachEvents() {
    const elements = {
        posts: document.querySelector('#posts'),
        comments: document.querySelector('#post-comments'),
        postTitle: document.getElementById('post-title'),
        postBody: document.getElementById('post-body')
    };
 
    document.querySelector('#btnLoadPosts').addEventListener('click', loadPosts);
    document.querySelector('#btnViewPost').addEventListener('click', viewPost);
 
    async function loadPosts() {
        const data = await (await fetch('http://localhost:3030/jsonstore/blog/posts')).json();
        elements.posts.innerHTML = Object.entries(data)
            .map(([key, {title, body}]) => 
                `<option value="${key}" data-body="${body}">${title}</option>`
            ).join('');
    }
 
    async function viewPost() {
        const selected = elements.posts.selectedOptions[0];
        elements.postTitle.textContent = selected.textContent;
        elements.postBody.textContent = selected.dataset.body;
 
        const comments = await (await fetch('http://localhost:3030/jsonstore/blog/comments')).json();
        elements.comments.innerHTML = Object
            .values(comments)
            .filter(c => c.postId === selected.value)
            .map(c => `<li id="${c.id}">${c.text}</li>`)
            .join('');
    }
}
 
attachEvents();