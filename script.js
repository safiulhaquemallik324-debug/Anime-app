const animeContainer = document.getElementById("anime-container");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const loader = document.getElementById("loader");
const emptyState = document.getElementById("empty-state");

const modal = document.getElementById("anime-modal");
const modalBody = document.querySelector(".modal-body");
const closeModal = document.getElementById("close-modal");


// HAMBURGER MENU
const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-links");

// NAV LINKS
const navlinks = document.querySelectorAll(".nav-links a");

////   /////       hamburger mwnu ////////////////////////////

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
// ================= SECTIONS =================

const homeSection =
document.getElementById("home");

const animeSection =
document.getElementById("anime-section");


// ================= GENRE CARDS =================

const genreCards =
document.querySelectorAll(".genre-card");

// ================= NAV LINKS =================

const navLinks = document.querySelectorAll(".nav-links a");
const filterButtons = document.querySelectorAll(".filter-btn");

// ================= API =================

const BASE_URL = "https://api.jikan.moe/v4";

// ================= FETCH FUNCTION =================

async function fetchAnime(url) {

  showLoader();

  animeContainer.innerHTML = "";

  try {

    const response = await fetch(url);

    const data = await response.json();

    renderAnime(data.data);

  } catch (error) {

    console.log(error);

    animeContainer.innerHTML = `
      <h2 class="error-text">
        Failed to load anime data
      </h2>
    `;

  } finally {

    hideLoader();

  }
}

// ================= RENDER FUNCTION =================

function renderAnime(animes) {

  animeContainer.innerHTML = "";

  if (!animes || animes.length === 0) {

    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  animes.forEach((anime) => {

    const animeCard = document.createElement("div");

    animeCard.classList.add("anime-card");

    animeCard.innerHTML = `

      <img 
        src="${anime.images.jpg.large_image_url}" 
        alt="${anime.title}"
      >

      <div class="anime-info">

        <h2>${anime.title}</h2>

        <div class="anime-meta">

          <span class="rating">
            ⭐ ${anime.score || "N/A"}
          </span>

          <span>
            ${anime.episodes || "?"} EP
          </span>

        </div>

        <button class="view-btn">
          View Details
        </button>

      </div>

    `;

    const viewBtn = animeCard.querySelector(".view-btn");

    viewBtn.addEventListener("click", () => {
      openModal(anime);
    });

    animeContainer.appendChild(animeCard);

  });
}

// ================= SEARCH =================

searchBtn.addEventListener("click", () => {

  const searchValue = searchInput.value.trim();

  if (searchValue !== "") {

    fetchAnime(`${BASE_URL}/anime?q=${searchValue}`);
  }
});

// ================= ENTER SEARCH =================

searchInput.addEventListener("keypress", (e) => {

  if (e.key === "Enter") {

    const searchValue = searchInput.value.trim();

    if (searchValue !== "") {

      fetchAnime(`${BASE_URL}/anime?q=${searchValue}`);
    }
  }
});

// ================= NAVBAR LINKS =================

// HOME

navLinks[0].addEventListener("click", (e) => {

  e.preventDefault();

  fetchAnime(`${BASE_URL}/top/anime`);
});

// TRENDING

navLinks[1].addEventListener("click", (e) => {

  e.preventDefault();

  fetchAnime(`${BASE_URL}/seasons/now`);
});

// POPULAR

navLinks[2].addEventListener("click", (e) => {

  e.preventDefault();

  fetchAnime(`${BASE_URL}/top/anime?filter=bypopularity`);
});

// GENRES

navLinks[3].addEventListener("click", (e) => {

  e.preventDefault();

  fetchAnime(`${BASE_URL}/anime?genres=1`);
});



// ================= GENRE CARDS =================

genreCards.forEach((card) => {

    card.addEventListener("click", () => {
  
      const genreId =
      card.dataset.genre;
  
      fetchAnime(
        `${BASE_URL}/anime?genres=${genreId}`
      );
  
    });
  
  });

// ================= MODAL =================

function openModal(anime) {

  modal.classList.remove("hidden");

  modalBody.innerHTML = `

    <div class="modal-anime">

      <img 
        src="${anime.images.jpg.large_image_url}" 
        alt="${anime.title}"
      >

      <div class="modal-info">

        <h1>${anime.title}</h1>

        <p>
          ${anime.synopsis || "No description available."}
        </p>

        <div class="modal-details">

          <span>⭐ ${anime.score || "N/A"}</span>

          <span>
            🎬 ${anime.type || "Unknown"}
          </span>

          <span>
            📺 ${anime.episodes || "?"} Episodes
          </span>

        </div>

        <a 
          href="${anime.url}" 
          target="_blank"
          class="anime-link"
        >
          Watch More
        </a>

      </div>

    </div>

  `;
}
// ================= CLOSE MODAL =================

closeModal.addEventListener("click", () => {

    modal.classList.add("hidden");
  
  });
  
  // CLICK OUTSIDE TO CLOSE
  
  window.addEventListener("click", (e) => {
  
    if (e.target === modal) {
  
      modal.classList.add("hidden");
    }
  });

// ================= LOADER =================

function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}

// ================= DEFAULT LOAD =================

// Refresh korle always top anime load hobe

fetchAnime(`${BASE_URL}/top/anime`);


// ================= THEME BUTTON =================

const themeBtn =
document.querySelector(".theme-btn");

// ================= DARK / LIGHT MODE =================

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");
  
    // ICON CHANGE
  
    const icon = themeBtn.querySelector("i");
  
    if (
      document.body.classList.contains("light-mode")
    ) {
  
      icon.classList.remove("ri-moon-fill");
      icon.classList.add("ri-sun-fill");
  
    } else {
  
      icon.classList.remove("ri-sun-fill");
      icon.classList.add("ri-moon-fill");
    }
  });



  // ================= HOME =================

navLinks[0].addEventListener("click", (e) => {

    e.preventDefault();
  
    fetchAnime(`${BASE_URL}/top/anime`);
  
    // SCROLL TOP
  
    homeSection.scrollIntoView({
      behavior: "smooth"
    });
  
  });
  
  // ================= TRENDING =================
  
  navLinks[1].addEventListener("click", (e) => {
  
    e.preventDefault();
  
    fetchAnime(
      `${BASE_URL}/top/anime?filter=airing`
    );
  
    // SCROLL TO ANIME SECTION
  
    animeSection.scrollIntoView({
      behavior: "smooth"
    });
  
  });
  
  // ================= POPULAR =================
  
  navLinks[2].addEventListener("click", (e) => {
  
    e.preventDefault();
  
    fetchAnime(
      `${BASE_URL}/top/anime?filter=bypopularity`
    );
  
    animeSection.scrollIntoView({
      behavior: "smooth"
    });
  
  });
  
  // ================= GENRES =================
  
  navLinks[3].addEventListener("click", (e) => {
  
    e.preventDefault();
  
    animeSection.scrollIntoView({
      behavior: "smooth"
    });
  
  });



  