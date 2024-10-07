const apikey = "pub_516777e05d2825483dcfc39f665546d035c45";

const blogContainer = document.getElementById("blog-container");

const searchField = document.getElementById("search-input");

const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsdata.io/api/1/news?&apikey=${apikey}&category=science`;

    const response = await fetch(apiUrl);

    const data = await response.json();

    return data.results;
  } catch (error) {
    console.log("Error fetching random news", error);
    return [];
  }
}

function displayBlogs(results) {
  blogContainer.innerHTML = "";
  results.forEach((result) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");

    const img = document.createElement("img");
    img.src = result.image_url || "fallback-image-url.jpg";
    img.alt = result.title;

    const title = document.createElement("h2");
    // title.textContent = article.title;
    const truncatedTitle =
      result.title.length > 30
        ? result.title.slice(0, 30) + "..."
        : result.title;

    title.textContent = truncatedTitle;

    const description = document.createElement("p");
    // description.textContent = article.description;
    const truncatedDescription =
      result.description.length > 120
        ? result.description.slice(0, 120) + "..."
        : result.description;

    description.textContent = truncatedDescription;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
      window.open(result.source_url, "_blank");
    });

    blogContainer.appendChild(blogCard);
  });
}

(async () => {
  try {
    const results = await fetchRandomNews();
    displayBlogs(results);
  } catch (error) {
    console.log(error);
  }
})();

async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://newsdata.io/api/1/news?&apikey=${apikey}&q=${query}`;

    const response = await fetch(apiUrl);

    const data = await response.json();

    return data.results;
  } catch (error) {
    console.log("Error fetching news by query", error);
    return [];
  }
}

searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim();

  if (query != "") {
    try {
      const results = await fetchNewsQuery(query);
      displayBlogs(results);
    } catch (error) {
      console.log("Error fetching news by query", error);
    }
  }
});
