const form = document.querySelector('form')

const createPost = async (e) => {
    e.preventDefault();

    const data = {
        title: form.title.value,
        content: form.content.value,
        likes: 0
    }

    await fetch('http://localhost:3000/posts', {
        method : 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'Application/json'}
    });

    window.location.replace('./index.html')

};

form.addEventListener('submit', createPost);

