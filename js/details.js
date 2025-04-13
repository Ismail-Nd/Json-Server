const id = new URLSearchParams(window.location.search).get("id");
const container = document.querySelector(".details");
const deleteBtn = document.querySelector(".delete");

const renderDetails = async () => {
  const res = await fetch("http://localhost:3000/posts/" + id);
  const post = await res.json();

  const template = `
            <div class="flex flex-col justify-center w-full max-w-2xl p-6">
                <h1 class="text-5xl mb-4">${post.title}</h1>
                <p class="text-3xl">${post.content}</p>
            </div>
        `
  container.innerHTML = template;
}

deleteBtn.addEventListener("click", async (e) => {
  const res = await fetch("http://localhost:3000/posts/" + id, {
    method: "DELETE"
  })
  window.location.replace("./index.html");
})


window.addEventListener("DOMContentLoaded", () => renderDetails());
