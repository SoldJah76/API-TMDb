$(document).ready(function() {
    movieId = $_GET('id');
    api_settings.url = r_video_movie.replace("{movie_id}", movieId);


    //On récupert la vidéo
    $.ajax(api_settings).done(function(response){
        find = false;
        $.each(response.results, function(key, video) {
            if (video.type == "Trailer" && !find) {
                find = true;
                youtube = "https://www.youtube.com/embed/" + video.key
            }
        });
    });

    api_settings.url = r_detail_movie.replace("{movie_id}", movieId);
    $.ajax(api_settings).done(function(response){
        let genre_str = "";
        let producteur_str = "";
        let country_str = "";

        $.each(response.genres, function(key, genre) {
            genre_str += genre.name + " / ";
        });
        genre_str = genre_str.substr(0, genre_str.length - 3);

        $.each(response.production_companies, function(key, producteur) {
            producteur_str += producteur.name + " / ";
        });
        producteur_str = producteur_str.substr(0, producteur_str.length - 3);

        $.each(response.production_countries, function(key, country) {
            country_str += country.name + " / ";
        });
        country_str = country_str.substr(0, country_str.length - 3);

        poster = url_image_small + response.poster_path;

        // objMovieDetails = {
        //     id: movieId,
        //     title: response.title,
        //     overview: response.overview,
        //     date: response.release_date,
        //     poster: url_image_small + response.poster_path,
        //     backdrop: url_image_original + response.backdrop_path,
        //     genre: genre_str,
        //     budget: response.budget,
        //     producteur: producteur_str,
        //     country: country_str
        // };

        $('section').append('<div class="img_description"><div class="img"><img src="'+poster+'" alt="'+response.title+'" title="'+response.title+'"></div>' +
            '<div class="description"><div class="title">'+response.title+'</div><div class="note">Note : '+response.vote_average+'/10</div><div' +
            ' class="date">'+response.release_date+'</div><div class="producteur">'+producteur_str+'</div><div class="genre">'+genre_str+'</div><div class="country">'+country_str+'</div></div></div>' +
            '<div class="overview">'+response.overview+'</div>' +
            '<div class="video"><iframe width="420" height="315" src="'+youtube+'"></iframe></div>')

    });

    function $_GET(param) {
        let vars = {};
        window.location.href.replace( location.hash, '' ).replace(/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
            function( m, key, value ) { // callback
                vars[key] = value !== undefined ? value : '';
            }
        );

        if ( param ) {
            return vars[param] ? vars[param] : null;
        }
        return vars;
    }
});
