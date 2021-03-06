$(function() {

    api_settings.url = r_last_movie + "&page=1";

    $.ajax(api_settings).done(function(response) {
        $.each(response.results, function(key, movie) {
            $('section').append('<div id="'+movie.id+'" class="poster"><a href="detail.html?id='+movie.id+'"><img src="'+url_image_small + movie.poster_path+'" alt="'+movie.title+'" title="'+movie.title+'"></a></div>')
        });
    });

    $('form').submit(function(e) {
        e.preventDefault();
        let recherche = $('input[name="search"]').val();
        let type = $('select[name="type"]').val();

        window.location.href = 'list_films.html?search=' + recherche + '&type=' + type;
    });

});