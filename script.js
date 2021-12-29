let popularMovies = document.getElementById('popular');

let popularApi =
	'https://api.themoviedb.org/3/discover/movie?api_key=127827045d764f32a3db753d48f9f59d&language=en-US&sort_by=popularity.desc&include_video=true&page=4&';

let details =
	'https://api.themoviedb.org/3/movie/634649?api_key=127827045d764f32a3db753d48f9f59d&language=en-U';

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

getMovies(popularApi);

// FUNCTIONS FOR FETCHING MOVIES
async function getMovies(api) {
	let response = await fetch(api);
	let data = await response.json();
	printMovies(popularMovies, data);
}

function printMovies(wrapper, data) {
	wrapper.innerHTML = '';
	let listMovies = data.results;
	listMovies = listMovies.slice(0, 5);

	listMovies.forEach(function (movie) {
		let singleMovie = document.createElement('div');
		singleMovie.classList.add('single-movie');
		singleMovie.innerHTML += `
                <div class="img-wrapper">
                     <img src="https://image.tmdb.org/t/p/w500${
												movie.backdrop_path
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
