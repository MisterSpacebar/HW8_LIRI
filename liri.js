var request = require('request');
var inquirer = require('inquirer');
var random = require('./random.js');

var input;

process.argv.shift();  // skip node.exe
process.argv.shift();  // skip name of js file

input = process.argv.join(" ");

// Grab or assemble the movie name and store it in a variable called "movieName"
var movieName = input;
// ...

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey="+random.omdbKey.key;


// This line is just to help us debug against the actual URL.
// console.log(queryUrl);

function movieSearch(movieName){
  request(movieName, function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

      var movie = JSON.parse(body);

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it)
      console.log(movie.Title + " ("+movie.Year+")");
      console.log("Runtime: "+movie.Runtime);
      console.log("Rating: " + movie.imdbRating);
      console.log("Genre(s): "+movie.Genre);
      console.log("Language(s): "+movie.Language);
      console.log("Country of Origin: "+movie.Country);
      console.log("Director: "+movie.Director+" || Actors: "+movie.Actors);
      console.log("Plot: "+movie.Plot);
    } else {
        console.log("Error! Code: "+request.statusCode);
    }
  });
}

movieSearch(queryUrl);