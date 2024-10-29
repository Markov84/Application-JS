document.getElementById("btnLoadPosts").addEventListener("click", loadPosts);
document.getElementById("btnViewPost").addEventListener("click", viewPost);

async function attachEvents() {
    const postsSelect = document.getElementById("posts");
    postsSelect.innerHTML = ''; // Изчистване на предишните опции

    try {
        const response = await fetch("http://localhost:3030/jsonstore/blog/posts");
        const posts = await response.json();

        Object.values(posts).forEach(post => {
            const option = document.createElement("option");
            option.value = post.id;
            option.textContent = post.title;
            postsSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Грешка при зареждане на публикациите:", error);
    }
}

async function handleViewPost() {
    const postId = document.getElementById("posts").value;
    const postTitleElem = document.getElementById("post-title");
    const postBodyElem = document.getElementById("post-body");
    const postCommentsElem = document.getElementById("post-comments");
    postCommentsElem.innerHTML = ''; // Изчистване на предишните коментари

    try {
        const postResponse = await fetch(`http://localhost:3030/jsonstore/blog/posts/${postId}`);
        const post = await postResponse.json();

        postTitleElem.textContent = post.title;
        postBodyElem.textContent = post.body;

        const commentsResponse = await fetch("http://localhost:3030/jsonstore/blog/comments");
        const comments = await commentsResponse.json();

        Object.values(comments).forEach(comment => {
            if (comment.postId === postId) {
                const li = document.createElement("li");
                li.textContent = comment.text;
                postCommentsElem.appendChild(li);
            }
        });
    } catch (error) {
        console.error("Грешка при зареждане на публикацията:", error);
    }
}
