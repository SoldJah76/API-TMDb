$(function() {

    if ($_GET('type') != null) {
        let search = $_GET('search');
        let type = $_GET('type');

        if (type === 'person') {
            api_settings.url = r_search_people + "&query=" + search + "&page=1";

            $.ajax(api_settings).done(function(response) {
                $.each(response.results, function(key, person) {
                    displayPerson(key, person);
                });
            });
        } else if (type === 'film') {
            api_settings.url = r_search_movie + "&query=" + search + "&page=1";

            $.ajax(api_settings).done(function(response) {
                $.each(response.results, function(key, movie) {
                    displayMovie(key, movie);
                });
            });
        }
    } else {
        $.when(getListGenre()).done(function(x) {
            sendRequest();
        });

        $("#sort").change(function() {
            $("#films").empty();
            sendRequest();
        });

        $("#order").change(function() {
            $("#films").empty();
            sendRequest();
        });
    }

    function sendRequest() {
        let sort = $('#sort').val();
        let order = $('#order').val();
        let page = 1;

        api_settings.url = r_listing_movie.replace("{sort}", sort + "." + order) + "&page=" + page;

        $.ajax(api_settings).done(function(response) {
            $.each(response.results, function(key, movie) {
                displayMovie(key, movie);
            });
        });
    }

    function displayMovie(key, movie) {
        // On récupère la liste des genres par l'ID
        let genre_str = "";
        $.each(movie.genre_ids, function (key, genre_id) {
            genre_str += arrListGenre[genre_id] + " / ";
        });
        genre_str = genre_str.substr(0, genre_str.length - 3);
        let overview = movie.overview;
        if (overview === null) {
            overview = '';
        }

        let poster_path = movie.poster_path;
        if (poster_path === null) {
            poster_path = "image/nopicture.gif"
        } else {
            poster_path = url_image_extra_small + movie.poster_path
        }

        $("#films").append('<div id="'+movie.id+'" class="film">' +
            '<a href="detail.html?id='+movie.id+'"><div class="img"><img src="'+poster_path+'" alt="'+movie.title+'" title="'+movie.title+'"></div></a>' +
            '<div class="description"><div class="title">'+movie.title+'</div><div class="note">Note : '+movie.vote_average+'/10</div><div' +
            ' class="year">'+movie.release_date+'</div><div class="genre">'+genre_str+'</div>' +
            '<div class="overview">'+overview+'</div></div>' +
            '</div><tr>');
    }

    function displayPerson(key, person) {
        // On récupère la liste des genres par l'ID
        let poster_path = person.profile_path;
        if (poster_path === null) {
            poster_path = "image/nopicture.gif"
        } else {
            poster_path = url_image_extra_small + person.profile_path
        }

        $("#films").append('<div id="'+person.id+'" class="film">' +
            '<div class="img"><img src="'+poster_path+'" alt="'+person.name+'" title="'+person.name+'"></div>' +
            '<div class="description"><div class="title">'+person.name+'</div></div></div><tr>');
    }

});