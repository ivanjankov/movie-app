let popularMovies = document.getElementById('popular');
let comingSoonMovies = document.getElementById('coming-soon');
let topRatedMovies = document.getElementById('top-rated');
let tvShows = document.getElementById('tv-shows');
let searchInput = document.getElementById('search');
let multiTitle = document.getElementById('multi-title');

let movieId;

let popularApi =
	'https://api.themoviedb.org/3/discover/movie?api_key=127827045d764f32a3db753d48f9f59d&language=en-US&sort_by=popularity.desc&include_video=true&page=10&';

let upcomingMovies =
	'https://api.themoviedb.org/3/movie/upcoming?api_key=127827045d764f32a3db753d48f9f59d&language=en-US&page=1';

let details =
	'https://api.themoviedb.org/3/movie/634649?api_key=127827045d764f32a3db753d48f9f59d&language=en-U';
let categories = {
	topRated:
		'https://api.themoviedb.org/3/movie/top_rated?api_key=127827045d764f32a3db753d48f9f59d&language=en-US&page=1',
	tvShows:
		'https://api.themoviedb.org/3/discover/tv?api_key=127827045d764f32a3db753d48f9f59d&language=en-US&sort_by=popularity.desc&page=1&0',
};

let moviesGenre = {
	Action: 28,
	Adventure: 12,
	Animation: 16,
	Comedy: 35,
	Crime: 80,
	Documentary: 99,
	Drama: 18,
	Family: 10751,
	Fantasy: 14,
	History: 36,
	Horror: 27,
	Music: 10402,
	Mystery: 9648,
	Romance: 10749,
	ScienceFiction: 878,
	TVMovie: 10770,
	Thriller: 53,
	War: 10752,
	Western: 37,
};

function functionsController() {
	getMovies(popularApi, printPopularMovies, popularMovies);
	getMovies(categories.topRated, printPopularMovies, topRatedMovies);
	getMovies(upcomingMovies, printPopularMovies, comingSoonMovies);
	getMovies(categories.tvShows, printPopularShows, tvShows);
	getMovieDetails();
	// getWeather();
}

functionsController();
searchMovies();

// FUNCTIONS FOR FETCHING MOVIES
async function getMovies(api, callback, wrapper, num = 20) {
	let response = await fetch(api);
	let data = await response.json();
	callback(wrapper, data, num);
}
async function getSingleMovieApi(api, callback, moviegenre) {
	let response = await fetch(api);
	let data = await response.json();
	callback(data, moviegenre);
	console.log(data);
}

function searchMovies() {
	let searchTerm = '';
	let searchApi = `https://api.themoviedb.org/3/search/movie?api_key=127827045d764f32a3db753d48f9f59d&language=en-US&query=${searchTerm}&page=1&include_adult=false`;
	searchInput.addEventListener('keyup', (e) => {
		searchTerm = e.target.value;
		if (searchTerm !== '') {
			multiTitle.innerHTML = `"${e.target.value}"`;
			searchApi = `https://api.themoviedb.org/3/search/movie?api_key=127827045d764f32a3db753d48f9f59d&language=en-US&query=${searchTerm}&page=1&include_adult=false`;
			getMovies(searchApi, printPopularMovies, popularMovies, 20);
			getMovieDetails();
		} else if (searchTerm == '') {
			multiTitle.innerHTML = 'Popular';
			functionsController();
		}
	});
}
function printPopularMovies(wrapper, data, num = 20) {
	wrapper.innerHTML = '';
	let listMovies = data.results;
	listMovies = listMovies.slice(0, num);

	listMovies.forEach(function (movie) {
		let singleMovie = document.createElement('div');
		singleMovie.classList.add('swiper-slide', 'single-movie');
		singleMovie.setAttribute('id', movie.id);
		singleMovie.innerHTML += `
				<div class="img-wrapper">
                     <img src="https://image.tmdb.org/t/p/w400${
												movie.poster_path
											}" alt="${movie.title}" />
                </div>
	            <h6 class="movie-title">${movie.title}</h6>
	            <div class="movie-length">
	                <i class="far fa-clock"></i>
	                <p>${getGenre(moviesGenre, movie.genre_ids)}</p>
	            </div>

	    `;
		wrapper.appendChild(singleMovie);
	});
}
function printPopularShows(wrapper, data) {
	wrapper.innerHTML = '';
	let listMovies = data.results;
	listMovies = listMovies.slice(0, 20);

	listMovies.forEach(function (movie) {
		let singleMovie = document.createElement('div');
		singleMovie.classList.add('swiper-slide', 'single-show');
		singleMovie.setAttribute('id', movie.id);
		singleMovie.innerHTML += `  
					<div class="img-wrapper">            
                     <img src="https://image.tmdb.org/t/p/w400${
												movie.poster_path
											}" alt="${movie.title}" class="movie-img" />
					</div>
				
					<h6 class="movie-title">${movie.name}</h6>
					<div class="movie-length">
						<i class="far fa-clock"></i>
						<p>${getGenre(moviesGenre, movie.genre_ids)}</p>
					</div>
				
	    `;
		wrapper.appendChild(singleMovie);
	});
}

function getGenre(genrelist, currMovieGenre) {
	let genreArr = [];

	for (let genre in genrelist) {
		for (let i = 0; i < currMovieGenre.length; i++) {
			if (genrelist[genre] === currMovieGenre[i]) {
				genreArr.push(genre);
			}
		}
	}
	return genreArr;
}

// MODAL FUNCIONALITY
let closeModalBtn = document.getElementById('close-modal');

closeModalBtn.addEventListener('click', () => {
	let modalImg = document.getElementById('modal-img');
	modalImg.setAttribute('src', '');
	document.body.style.overflow = 'auto';
	document.getElementById('modal').style.display = 'none';
});

function getMovieDetails() {
	let singleMovieApi;
	setTimeout(() => {
		let movieList = Array.from(
			document.querySelectorAll('.single-show, .single-movie')
		);
		movieList.forEach((movie) => {
			movie.addEventListener('click', () => {
				document.body.style.overflow = 'hidden';

				let movieGenre = movie.children[2].children[1].textContent;
				document.getElementById('modal').style.display = 'flex';

				if (movie.classList.contains('single-movie')) {
					singleMovieApi = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=127827045d764f32a3db753d48f9f59d&language=en-US`;
				} else {
					singleMovieApi = `https://api.themoviedb.org/3/tv/${movie.id}?api_key=127827045d764f32a3db753d48f9f59d&language=en-US`;
				}

				console.log(singleMovieApi);

				getSingleMovieApi(singleMovieApi, fillModalContent, movieGenre);
			});
		});
	}, 1000);
}

function fillModalContent(data, moviegenre) {
	console.log(data);
	let modalContainer = document.getElementById('modal-container');
	modalContainer.innerHTML = `<img id="modal-img" src="https://image.tmdb.org/t/p/w400${
		data.poster_path
	}"></img>
	<div class="movie-description">
			<h3 id="modal-heading">${data.title || data.name}</h3>
			<p id="modal-paragraph">
				${data.overview}

			</p>
		<div class="genre-wrapper">
			<h6>Genre</h6>
			<p id="genre">${moviegenre}</p>
		</div>
		<div class="movie-details-wrapper">
			<h6>Movie details</h6>
			<ul id="movie-details">
				<li class="movie-detail">Rating: ${data.vote_average}</li>
				<li id="runtime" class="movie-detail">Runtime: ${
					data.runtime || data.episode_run_time[0]
				} min.</li>
			</ul>
		</div>
	</div>`;
}

const swiper = new Swiper('.swiper', {
	// Optional parameters
	direction: 'horizontal',
	slidesPerView: 6,
	spaceBetween: 10,
	loop: false,
	freeMode: true,

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

// WEATHER API
let weatherIcon = document.getElementById('weather-icon');
let weatherInfo = document.getElementById('weather-info');

if ('geolocation' in navigator) {
	navigator.geolocation.getCurrentPosition((position) => {
		getWeather(position.coords.latitude, position.coords.longitude);
	});
} else {
	/* geolocation IS NOT available */
}

async function getWeather(lat, lon) {
	let response = await fetch(
		`https:/api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=154ad2cbe7980f93e5148a9d8289e47d`
	);
	let data = await response.json();

	weatherIcon.setAttribute(
		'src',
		`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
	);
	weatherInfo.innerHTML = `
					<p class="curr-temp">${Math.ceil(data.main.temp)}&#8451;</p>
					<p class="location">${data.name}, ${data.sys.country}</p>`;
}
