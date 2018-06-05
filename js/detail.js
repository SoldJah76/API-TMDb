$(function() {
    let movieId = $_GET('id');
    api_settings.url = r_video_movie.replace("{movie_id}", movieId);
    let youtube = '';

    //On récupert la vidéo
    $.ajax(api_settings).done(function(response) {
        if (response.results.length !== 0) {
            let find = false;
            $.each(response.results, function(key, video) {
                if (video.type === "Trailer" && !find) {
                    find = true;
                    youtube = '<div class="video"><iframe width="420" height="315" src="https://www.youtube.com/embed/' + video.key+'"></iframe></div>';
                }
            });
        }
    });

    api_settings.url = r_detail_movie.replace("{movie_id}", movieId);
    $.ajax(api_settings).done(function(response) {
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

        let poster = url_image_small + response.poster_path;

        $('section').append('<div class="img_description"><div class="img"><img src="'+poster+'" alt="'+response.title+'" title="'+response.title+'"></div>' +
            '<div class="description"><div class="title">'+response.title+'</div><div class="note">Note : '+response.vote_average+'/10</div><div' +
            ' class="date">'+response.release_date+'</div><div class="producteur">'+producteur_str+'</div><div class="genre">'+genre_str+'</div><div class="country">'+country_str+'</div>' +
            '<div class="overview">'+response.overview+'</div>'+youtube+'</div></div>')

    });
});
