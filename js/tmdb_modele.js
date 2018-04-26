var api_key = "2b5d9c50bb437e6b549dae5e834f3778";
var api_language = "fr";

var api_settings ={
	"async":true,
	"crossDomain":true,
	"url":"",
	"method":"GET",
	"headers":{},
	"data":"{}"
};


/* Liste de liens TMBD API */
var url_image_small = "https://image.tmdb.org/t/p/w300";
var url_image_original = "https://image.tmdb.org/t/p/original";

var r_last_movie = "https://api.themoviedb.org/3/movie/upcoming?api_key="+api_key+"&language="+api_language;						// Dernières sorties
var r_listing_movie = "https://api.themoviedb.org/3/discover/movie?api_key="+api_key+"&language="+api_language+"&sort_by={sort}";	// Listing filtré
var r_video_movie = "https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key="+api_key+"&language="+api_language;				// Vidéos d'un film
var r_genre_movie = "https://api.themoviedb.org/3/genre/movie/list?api_key="+api_key+"&language="+api_language;						// La liste des genres
var r_detail_movie = "https://api.themoviedb.org/3/movie/{movie_id}?api_key="+api_key+"&language="+api_language;					// Détails d'un film
var r_detail_person = "https://api.themoviedb.org/3/person/{person_id}?api_key="+api_key+"&language="+api_language;					// Détails d'une personne

var r_search_movie = "https://api.themoviedb.org/3/search/movie?api_key="+api_key+"&language="+api_language;						// Recherche d'un film avec mot-clé
var r_search_people = "https://api.themoviedb.org/3/search/person?api_key="+api_key+"&language="+api_language;						// Recherche d'une personne avec mot-clé


var arrListGenre = [];

// On instancie la liste de genres
$.when( getListGenre() ).done(function( x ) {
	// getListMovies("popularity", "desc");
	// getLatestMovies(1);
	// getMovieDetails(299536);
	// getMovieDetails(550);
	// getMovieVideo(299536);
	// getSearchMovie("fight club");
	// getSearchPerson("Chaplin");
	// getPersonDetails(13848);
	// getPersonDetails(287);
});

// function getLatestMovies(page = 1) {
// 	let arrLatestMovies = [];
// 	api_settings.url = r_last_movie + "&page=" + page;
//
// 	$.ajax(api_settings).done(function(response){
// 		$.each(response.results, function(key, movie) {
// 			arrLatestMovies.push({
// 				id: movie.id,
// 				title: movie.title,
// 				poster: url_image_small + movie.poster_path,
// 				backdrop: url_image_original + movie.backdrop_path
// 			});
// 		});
// 	});
//     //console.log(arrLastestMovies);
//     return arrLatestMovies;
// }

function getListGenre() {
	api_settings.url = r_genre_movie;

	$.ajax(api_settings).done(function(response){
		$.each(response.genres, function(key, genre) {
			arrListGenre[genre.id] = genre.name;
		})
	});
}

// popularity, release_date, original_title / desc, asc
// function getListMovies(sort, order, page = 1) {
// 	var arrListMovies = [];
// 	api_settings.url = r_listing_movie.replace("{sort}", sort + "." + order) + "&page=" + page;
//
// 	$.ajax(api_settings).done(function(response){
// 		$.each(response.results, function(key, movie) {
// 			// On récupère la liste des genres par l'ID
// 			var genre_str = "";
// 			$.each(movie.genre_ids, function(key, genre_id) {
// 				genre_str += arrListGenre[genre_id] + " / ";
// 			})
// 			genre_str = genre_str.substr(0, genre_str.length - 3);
//
// 			arrListMovies.push({
// 				id: movie.id,
// 				title: movie.title,
// 				poster: url_image_small + movie.poster_path,
// 				backdrop: url_image_original + movie.backdrop_path,
// 				date: movie.release_date,
// 				note: movie.vote_average,
// 				genre: genre_str
// 			});
// 		});
// 		console.log(arrListMovies);
// 		// return arrListMovies;
// 	});
// }

function getMovieVideo(movieId) {
	api_settings.url = r_video_movie.replace("{movie_id}", movieId);

	$.ajax(api_settings).done(function(response){
		console.log(response);
		find = false;
		$.each(response.results, function(key, video) {
			if (video.type == "Trailer" && !find) {
				find = true;
				console.log("https://www.youtube.com/embed/" + video.key);
				//return video.key;
			};
		});
	});
}

function getSearchMovie(query, page = 1) {
	var arrSearchMovie = [];
	api_settings.url = r_search_movie + "&query=" + query + "&page=" + page;

	$.ajax(api_settings).done(function(response){
		$.each(response.results, function(key, movie) {
			var genre_str = "";

			$.each(movie.genre_ids, function(key, genre_id) {
				genre_str += arrListGenre[genre_id] + " / ";
			})
			genre_str = genre_str.substr(0, genre_str.length - 3);

			arrSearchMovie.push({
				id: movie.id,
				title: movie.title,
				genre: genre_str,
				date: movie.release_date,
				poster: url_image_small + movie.poster_path,
				backdrop: url_image_original + movie.backdrop_path,
				overview: movie.overview,
				note: movie.vote_average
			});
		})
		console.log(arrSearchMovie);
	});
}

function getSearchPerson(query, page = 1) {
	var arrSearchPeople = [];
	api_settings.url = r_search_people + "&query=" + query + "&page=" + page;

	$.ajax(api_settings).done(function(response){
		$.each(response.results, function(key, person) {
			arrSearchPeople.push({
				id: person.id,
				name: person.name,
				photo: url_image_small + person.profile_path
			});
		});
		console.log(arrSearchPeople);
	});
}

function getMovieDetails(movieId) {
	var objMovieDetails = {};
	api_settings.url = r_detail_movie.replace("{movie_id}", movieId);

	$.ajax(api_settings).done(function(response){
		var genre_str = "";
		var producteur_str = "";
		var country_str = "";

		$.each(response.genres, function(key, genre) {
			genre_str += genre.name + " / ";
		})
		genre_str = genre_str.substr(0, genre_str.length - 3);

		$.each(response.production_companies, function(key, producteur) {
			producteur_str += producteur.name + " / ";
		});
		producteur_str = producteur_str.substr(0, producteur_str.length - 3);

		$.each(response.production_countries, function(key, country) {
			country_str += country.name + " / ";
		})
		country_str = country_str.substr(0, country_str.length - 3);

		objMovieDetails = {
			id: movieId,
			title: response.title,
			overview: response.overview,
			date: response.release_date,
			poster: url_image_small + response.poster_path,
			backdrop: url_image_original + response.backdrop_path,
			genre: genre_str,
			budget: response.budget,
			producteur: producteur_str,
			country: country_str
		};
		// console.log(response);
		console.log(objMovieDetails);
		// return objMovieDetails;
	});
}

function getPersonDetails(personId) {
	var objPersonDetails = {};
	api_settings = r_detail_person.replace("{person_id}", personId);

	$.ajax(api_settings).done(function(response){

		lifeDate = response.birthday;
		if (response.deathday != null) {
			lifeDate += " - " + response.deathday;
		};

		objPersonDetails = {
			id: personId,
			name: response.name,
			photo: url_image_small + response.profile_path,
			date: lifeDate,
			place: response.place_of_birth,
			bio: response.biography
		}
		console.log(objPersonDetails);

	});
}
