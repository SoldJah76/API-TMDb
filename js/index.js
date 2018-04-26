$(document).ready(function() {

    api_settings.url = r_last_movie + "&page=1";

    $.ajax(api_settings).done(function(response){
        $.each(response.results, function(key, movie) {
            // arrLatestMovies.push({
            //     id: movie.id,
            //     title: movie.title,
            //     poster: url_image_small + movie.poster_path,
            //     backdrop: url_image_original + movie.backdrop_path
            // });
        $('section').append('<div id="'+movie.id+'" class="poster"><a href="#"><img src="'+url_image_small + movie.poster_path+'" alt="'+movie.title+'" title="'+movie.title+'"></a></div>')

        });
    });

});