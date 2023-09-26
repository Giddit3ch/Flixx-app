const global = {
    currentPage: window.location.pathname,
    search: {
        term: '',
        type: '',
        page: 1,
        totalPages: 1
    },
    api: {
        apiKey: '0df73b3f1d355f16e1df632ce244af74',
        apiUrl: 'https://api.themoviedb.org/3'
    }
};


async function displayPopularMovies() {
    const { results } = await fetchAPIData('movie/popular');
    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('card')
        div.innerHTML =`
        <a href="movie-details.html?id=${movie.id}">
          ${
            movie.poster_path
            ? `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`: `<img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="${movie.title}"
        />`
        }
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
      </div>`;
      document.querySelector('#popular-movies').appendChild(div);
    });
}
// Display Popular shows
async function displayPopularShows() {
    const { results } = await fetchAPIData('tv/popular');
    results.forEach(show => {
        const div = document.createElement('div');
        div.classList.add('card')
        div.innerHTML =`
        <a href="tv-details.html?id=${show.id}">
          ${
            show.poster_path
            ? `<img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"
          />`: `<img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="${show.name}"
        />`
        }
       
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
            <small class="text-muted">Air Date: ${show.first_air_date}</small>
          </p>
          </a>
      </div>`;
      document.querySelector('#popular-shows').appendChild(div);
    });
}
// Display Movie DETAILS-----------------------
async function displayMovieDetails() {
    const movieId = window.location.search.split('=')[1];
    const movie = await fetchAPIData(`movie/${movieId}`);
    
// overLay fro background image
displayBackgroundImage('movie', movie.backdrop_path);

    const div = document.createElement('div');
    div.innerHTML = `<div class="details-top">
    <div>
    ${
        movie.poster_path
        ? `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
      />`: `<img
      src="../images/no-image.jpg"
      class="card-img-top"
      alt="${movie.title}"
    />`
    }
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
      ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${
            movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')
        }
      </ul>
      <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
      <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
      <li><span class="text-secondary">Status:</span>${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
    ${movie.production_companies
        .map((company)=>
        `<span>${company.name}</span>`
    ).join('')}
    </div>
  </div>`
  document.querySelector('#movie-details').appendChild(div);
}

// Display SHOW DETAILS-----------------------
async function displayShowDetails() {
    const showId = window.location.search.split('=')[1];
    const show = await fetchAPIData(`/tv/${showId}`);
    // Display background Image
    displayBackgroundImage('show', show.backdrop_path);

    // add show details dynamicaly
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="details-top">
    <div>
     ${
        show.poster_path?
        ` <img
        src="https://image.tmdb.org/t/p/w500${show.poster_path}"
        class="card-img-top"
        alt="${show.name}"
      />`: `<img
      src="../images/no-image.jpg"
      class="card-img-top"
      alt="${show.name}"
    />`
     }
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">First Air Date: ${show.first_air_date}</p>
      <p>
        ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
      ${
        show.genres.map((genre) => `<span>${genre.name}</span>`).join(', ')
    }
      </ul>
      <a href=${show.homepage} target="_blank" class="btn">Visit Show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
      <li>
        <span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}: ${show.last_episode_to_air.overview}
      </li>
      <li><span class="text-secondary">Status:</span> ${show.status
      }</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
    ${
        show.production_companies.map((company) => `<span>${company.name}</span>`).join(', ')
    }
    </div>
  </div>
    </div>`

    document.querySelector('#show-details').appendChild(div)

}

//display Backdrop on detail page

function displayBackgroundImage(type, backgroundPath) {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';


    if(type === 'movie') {
        document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
        document.querySelector('#show-details').appendChild(overlayDiv);

    }
}

// Search Movies / shows
async function search() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    global.search.type = urlParams.get('type');
    global.search.term = urlParams.get('search-term');
    

    if(global.search.term !=='' && global.search.term !== null){
        

    } else {
        showAlert('Please enter a search term');
    }
}

// Display slider movies
async function displaySlider(type) {

        if(type === 'movie'){
            ({ results }  = await fetchAPIData('movie/now_playing'));
            results.forEach(movie => {
                const div = document.createElement('div');
                div.classList.add('swiper-slide');
                div.innerHTML =
                `
                <a href="movie-details.html?id=${movie.id}">
                  <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                </a>
                <h4 class="swiper-rating">
                  <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
                </h4>`
            
                document.querySelector('.swiper-wrapper').appendChild(div);
            
                initSwipper()
            });
        } else if (type === 'show'){
            ({ results }  = await fetchAPIData('tv/airing_today'));
            results.forEach(show => {
                const div = document.createElement('div');
                div.classList.add('swiper-slide');
                div.innerHTML =
                `
                <a href="tv-details.html?id=${show.id}">
                  <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.title}">
                </a>
                <h4 class="swiper-rating">
                  <i class="fas fa-star text-secondary"></i> ${show.vote_average} / 10
                </h4>`
            
                document.querySelector('.swiper-wrapper').appendChild(div);
            
                initSwipper()
            });
        }
}


// the are parameters need by the swiper slide to function
function initSwipper() {
    const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,      
    freeMode: false,
    loop: true,
    autoplay: {
        delay:4000,
        disapleOnInteraction: false
    } ,
    breakpoints: {
        500: {
            slidesPerView: 2
        },
        700: {
            slidesPerView: 3
        },
        1200: {
            slidesPerView: 4
        }
    }
    })
}


// Fetch data from TMBD API
//end point = /movie/id OR /show/id
async function fetchAPIData(endpoint) {
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiUrl;
    showSpinner();
    const response = await fetch(`${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`)

    const data = await response.json();
    hideSpinner();
    return data;
}

// Make Request to search


// show spinner
function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}
// hide spinner
function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}
// Highlight Active Link
function highlightActiveLink(e) {
    document.querySelectorAll('.nav-link').forEach((navLink) => {
        if( global.currentPage === '/index.html'&& navLink.innerText === 'Movies'){
            navLink.classList.add('active');
        }
        else if(navLink.getAttribute('href') === global.currentPage){
            navLink.classList.add('active');
        }
    });
}

// Show Alert
function showAlert(message, className) {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));

  document.querySelector('#alert').appendChild(alertEl);
}


function addCommasToNumber(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// init app
function init () {
    // router
    switch (global.currentPage){
        case '/':
        case '/index.html':
            displayPopularMovies();
            displaySlider('movie');
            break;
        case '/shows.html':
           displayPopularShows();
           displaySlider('show');
            break;
        case '/movie-details.html':
            displayMovieDetails();
            break;
        case '/tv-details.html':
            displayShowDetails();
            break;
        case '/search.html':
            search()
            break;
    }
    highlightActiveLink();
   
}
document.addEventListener('DOMContentLoaded', init);