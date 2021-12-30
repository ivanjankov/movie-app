let popularMovies = document.getElementById('popular');
let comingSoonMovies = document.getElementById('coming-soon');
let topRatedMovies = document.getElementById('top-rated');
let tvShows = document.getElementById('tv-shows');
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

getMovies(categories.topRated, printPopularMovies, topRatedMovies);
getMovies(upcomingMovies, printPopularMovies, comingSoonMovies);
getMovies(popularApi, printPopularMovies, popularMovies);
getMovies(categories.tvShows, printPopularShows, tvShows);
getMovieDetails();

// FUNCTIONS FOR FETCHING MOVIES
async function getMovies(api, callback, wrapper) {
	let response = await fetch(api);
	let data = await response.json();
	callback(wrapper, data);
}
async function getSingleMovieApi(api, callback) {
	let response = await fetch(api);
	let data = await response.json();
	callback(data);
}

function printPopularMovies(wrapper, data) {
	wrapper.innerHTML = '';
	let listMovies = data.results;
	listMovies = listMovies.slice(0, 5);

	listMovies.forEach(function (movie) {
		let singleMovie = document.createElement('div');
		singleMovie.classList.add('single-movie');
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
	listMovies = listMovies.slice(0, 5);

	listMovies.forEach(function (movie) {
		let singleMovie = document.createElement('div');
		singleMovie.classList.add('single-movie');
		singleMovie.setAttribute('id', movie.id);
		singleMovie.innerHTML += `
                <div class="img-wrapper">
                     <img src="https://image.tmdb.org/t/p/w400${
												movie.poster_path
											}" alt="${movie.title}" />
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

	document.getElementById('modal').style.display = 'none';
});
function getMovieDetails() {
	setTimeout(() => {
		let movieList = Array.from(document.querySelectorAll('.single-movie'));
		console.log(movieList);
		movieList.forEach((movie) => {
			movie.addEventListener('click', () => {
				document.getElementById('modal').style.display = 'flex';
				let singleMovieApi = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=127827045d764f32a3db753d48f9f59d&language=en-US`;
				getSingleMovieApi(singleMovieApi, fillModalContent);
				console.log(singleMovieApi);
			});
		});
	}, 1000);
}

function fillModalContent(data) {
	let modalImg = document.getElementById('modal-img');
	let modalHeading = document.getElementById('modal-heading');
	let modalParagraph = document.getElementById('modal-paragraph');

	modalImg.setAttribute(
		'src',
		`https://image.tmdb.org/t/p/w400${data.poster_path}`
	);
	modalHeading.textContent = data.title;
	modalParagraph.textContent = data.overview;
}
