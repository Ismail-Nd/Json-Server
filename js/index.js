const container = document.querySelector(".blogs");
const searchForm = document.querySelector(".search");
const searchInput = searchForm.querySelector("input[name='term']");

const renderpost = async (term) => {
  try {
    let url = "http://localhost:3000/posts?_sort=likes&_order=desc";
    if (term) {
      // Use both title and content for search
      url = `http://localhost:3000/posts?title_like=${encodeURIComponent(term)}&_sort=likes&_order=desc`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch posts');
    
    const posts = await res.json();

    if (posts.length === 0) {
      container.innerHTML = `
        <div class="text-center p-6 text-gray-600">
          No posts found matching "${term}"
        </div>
      `;
      return;
    }

    let template = "";
    posts.forEach((post) => {
      template += `
        <div class="flex flex-col justify-center bg-gray-100 p-4 m-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
          <h2 class="text-3xl font-bold text-gray-800">${post.title}</h2>
          <p class="text-gray-600">${post.content.slice(0, 100)}...</p>
          <span class="text-gray-500 text-sm">${post.likes} likes</span>
          <a href="./details.html?id=${post.id}" class="text-gray-800 underline hover:text-green-600">Read more</a>
        </div>
      `;
    });

    container.innerHTML = template;
  } catch (error) {
    console.error('Error:', error);
    container.innerHTML = `
      <div class="text-center p-6 text-red-600">
        Error loading posts. Please try again.
      </div>
    `;
  }
};

// Add real-time search with debounce
let searchTimeout;
searchInput.addEventListener("input", (e) => {
  console.log("Typing...", e.target.value);
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    const searchTerm = e.target.value.trim();
    renderpost(searchTerm);
  }, 300); // Wait 300ms after user stops typing
});

// Keep the form submit handler as backup
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();
  renderpost(searchTerm);
});

// Initial load
window.addEventListener("DOMContentLoaded", () => renderpost());