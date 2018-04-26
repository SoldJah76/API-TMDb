$(document).ready(function() {

    console.log($_GET('type'));

    if ($_GET('type') != null) {
        let search = $_GET('type')
    }
    else {
        $.when( getListGenre() ).done(function( x ) {
            sendRequest();
        });

        $( "#sort" ).change(function() {
            $("#films").empty();
            sendRequest();
            // console.log("sort");
            // console.log($(this).val());
        });

        $( "#order" ).change(function() {
            $("#films").empty();
            sendRequest();
        });
    }

    function sendRequest() {
        sort = $('#sort').val();
        order = $('#order').val();
        page = 1;

        api_settings.url = r_listing_movie.replace("{sort}", sort + "." + order) + "&page=" + page;

        $.ajax(api_settings).done(function (response) {
            $.each(response.results, function (key, movie) {
                // On récupère la liste des genres par l'ID
                let genre_str = "";
                $.each(movie.genre_ids, function (key, genre_id) {
                    genre_str += arrListGenre[genre_id] + " / ";
                });
                genre_str = genre_str.substr(0, genre_str.length - 3);
                overview = movie.overview;
                if (overview === null) {
                    overview = '';
                }

                poster_path = movie.poster_path;
                if (poster_path === null) {
                    poster_path = "image/nopicture.gif"
                } else {
                    poster_path = url_image_extra_small + movie.poster_path
                }

                $("#films").append('<div id="'+movie.id+'" class="film">' +
                    '<div class="img"><img src="'+poster_path+'" alt="'+movie.title+'" title="'+movie.title+'"></div>' +
                    '<div class="description"><div class="title">'+movie.title+'</div><div class="note">Note : '+movie.vote_average+'/10</div><div' +
                    ' class="year">'+movie.release_date+'</div><div class="genre">'+genre_str+'</div>' +
                    '<div class="overview">'+overview+'</div></div>' +
                '</div><tr>');

                // arrListMovies.push({
                //     id: movie.id,
                //     title: movie.title,
                //     poster: url_image_small + movie.poster_path,
                //     backdrop: url_image_original + movie.backdrop_path,
                //     date: movie.release_date,
                //     note: movie.vote_average,
                //     genre: genre_str
                // });
            });
        });
    }


});
