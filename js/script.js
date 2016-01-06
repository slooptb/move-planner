var $greeting = $('#greeting');
var $formContainer = $('#form-container');

function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytElem = $('#nytimes-articles');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // Get data from web form
    var street = $("#street").val();
    var city = $("#city").val();
    var place = street + ', ' + city;

    $greeting.text(place)
        .append('<hr class="m-y-2"><p class="lead"><a onclick="reset()" class="btn btn-primary btn-lg">New search?</a></p>');
    $formContainer.hide();



    // Our custom JSON URL with API key - PLEASE USE YOUR OWN API KEY!!!!!
    var nyTimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + city +
        '&sort=newest&api-key=b7a243bb88bf20cb02eed300f53c6a0f:9:73840994';

    // Get JSON and make news feed
    $.getJSON(nyTimesURL, function(data) {
        $.each(data.response.docs, function() {
            $nytElem.append('<a href="' + this.web_url + '" class="list-group-item"><h5 class="list-group-item-heading">' +
                this.headline.main + '</h4><p class="list-group-item-text">' +
                this.snippet + '</p></a>');
        });
    }).error(function(e) {
        $nytElem.append('Oops, there seems to have been an error retrieving articles');
        console.log(e);
    });

    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text('Failed to load wikipedia articles');
    }, 5000);

    // AJAX JSON-P request WikiPedia API
    var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + city + '&format=json';
    $.ajax(wikiURL, {
        dataType: 'jsonp',
        success: function(data) {
            $.each(data[1], function() {
                $wikiElem.append('<a href="https://en.wikipedia.org/wiki/' + this + '" class="list-group-item">' + this + '</a>');
            });
            clearTimeout(wikiRequestTimeout);
        }

    });

    // Set background image
    $body.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + place + '">');

    return false;
}

function reset() {
    $greeting.text('So, where do you want to live?');
    $formContainer.show();
}

$formContainer.submit(loadData);
$('#reset-btn').submit(reset);

// loadData();
