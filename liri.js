require("dotenv").config();
var request = require("request");
//import keys.js to variable

var keys = require("./keys")
var fs = require("fs")
var twitter = require("twitter")
var Spotify = require('node-spotify-api');
var command = process.argv[2]
var prop1 = process.argv.slice(3).join(" ");
var Spots = new Spotify(keys.spotify);
var client = new twitter(keys.twitter);

if (command === "movie-this") {
    if (prop1 === undefined) {
        prop1 = "Mr. Nobody";
    }
    movie();
}
if (command === "my-tweets") {
    tweet();
}
if (command === "do-what-it-says") {
    lame1();
}
if (command === "spotify-this-song") {
    if (prop1 === undefined) {
        prop1 = "The Sign by Ace of Base";
    }
    spoty1();
}
if (command === undefined) {
    console.log("Hello!  This is the Liri Bot Command Station!")
    console.log("Accepted commands include:" +
        "\n" + "my-tweets (shows last 20 tweets)" +
        "\n" + "spotify-this-song <songname> (displays song information)" +
        "\n" + "do-what-it-says (pulls information from a pre-written document)" +
        "\n" + "movie-this <movie name> (displays information about the movie)")
};

function tweet() {

    var params = { screen_name: 'CMcLaug86336388' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            for (let i = 0; i < 20; i++) {

                console.log(tweets[i].text)
            }
        }
        else {
            console.log("error" + err);
            return
        }
    });
}
function movie() {
    var movieName = "";
    let mov1 = "";

    for (let i = 0; i < prop1.length; i++) {
        mov1 = mov1 + prop1[i];

    };
    movieName = (mov1 + "+")
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            console.log("The movie's Title is: " + JSON.parse(body).Title);
            console.log("The movie's release year was: " + JSON.parse(body).Year);
            console.log("The movie's imdb rating is: " + JSON.parse(body).imdbRating);
            console.log("The movie's Rotten Tomatoes Score is: " + JSON.parse(body).Ratings[1]);
            console.log("The movie was produced in " + JSON.parse(body).Country);
            console.log("The movie was produced in " + JSON.parse(body).Language);
            console.log("The basic plot: " + JSON.parse(body).Plot);
            console.log("The main actors are: " + JSON.parse(body).Actors);

        }
    });
}


function spoty1() {
    Spots.search({ type: 'track', query: prop1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("The song name is " + data.tracks.items[0].name);
        console.log("The song artist(s) " + data.tracks.items[0].artists[0]); //fix
        console.log("The song preview link is " + data.tracks.items[0].external_urls.spotify);
        console.log("An album the song appears on is " + data.tracks.items[0].album.name);
    });
}

function lame1() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");

        console.log(dataArr);
        prop1 = dataArr
        spoty1();

    });
}