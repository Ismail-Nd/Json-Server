const container = document.querySelector(".blogs");
const searchForm = document.querySelector(".search")

const renderpost = async (term) => {
  let url = 'http://localhost:3000/posts?';
  if(term){
    url += `&q=${term}`;

  }


  const res = await fetch(url);
  const posts = await res.json();

  let template = "";

  posts.forEach((post) => {
    template += `
        <div class="flex flex-col justify-center bg-gray-100 p-4 m-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <h2 class="text-3xl font-bold text-gray-800">${post.title}</h2>
            <p class="text-gray-600">${post.content.slice(0, 100)}</p>
            <span class="text-gray-500 text-sm">${post.likes} likes</span>
            <a href="./details.html?id=${post.id}" class="text-gray-800 underline hover:text-green-600">Read more</a>
        </div>`;
  });

  container.innerHTML = template;
};

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  renderpost(searchForm.term.value.trim())
})

window.addEventListener("DOMContentLoaded", () => renderpost());
