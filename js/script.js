
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // Get data from web form
    var street = $("#street").val();
    var city = $("#city").val();
    var place = street + ', ' + city;

    $greeting.text('So you want to live at ' + place + '?');

    // Our custom JSON URL with API key
    var nyTimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?' +
        'q=' + city + '&sort=newest&api-key=b7a243bb88bf20cb02eed300f53c6a0f:9:73840994';

    // Get JSON and make news feed
    $.getJSON(nyTimesURL, function(data) {
        $.each(data.response.docs, function() {
            $nytElem.append('<li><a href="' + this.web_url + '">' + this.headline.print_headline + '</a>' +
                '<p>' + this.snippet + '</p></li>');
        });
    });

    // Set background image
    $body.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + place + '">');

    return false;
}

$('#form-container').submit(loadData);

// loadData();
