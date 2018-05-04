
require('dotenv').config();

var request = require('request');
var key = require("./keys.js");
var fs = require('fs');

// APPS

var Twitter = require("twitter")
var Spotify = require("node-spotify-api");
var client = new Twitter(key.twitter);

// Command Variables

var application = process.argv[2]; // action 
var userSearch = process.argv[3]; // search 

var moreCommands = "";
moreCommands = process.argv.slice(3).join('+'); 

var spotify = new Spotify(key.spotify);
// Switch runs the specific function based on user input 

switch (application) {
  case undefined:
      console.log("Search options are: spotify-this-song, movie-this, my-tweets or do-what-it-says.");
      break;
  case 'spotify-this-song':
      spotifySearch(userSearch);
      break;
  case 'movie-this':
      movieSearch(userSearch);
      break;
  case 'my-tweets':
      tweetSearch();
      break;
  case 'do-what-it-says':
      whateverYouSay();
      break;
}













// var client = new Twitter(keys.twitter);
// var spotify = new spotify(keys.spotify);

// // Twitter 

// client.post('statuses/update', {status: 'I am a tweet'}, function(error, tweet, response) {
//     if (!error) {
//       console.log(tweet);
//     }
//   });



// OMBD - search 

function movieSearch(userSearch) {
  console.log("loading");
  if(userSearch == undefined) {
      userSearch = 'Mr. Nobody';
  }

var queryUrl = "http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy";
      
  
  request(queryUrl, function(error, response, body) {
    var movieResponse = JSON.parse(body);
      if(!error && response.statusCode == 200) {
          //converts body from string type to JSON object
          body = JSON.parse(body);
          console.log('--------------------------------------------------------------');
          console.log('Title: '+ body.Title);
          console.log('--------------------------------------------------------------');
          console.log('Year Released: '+ body.Year);
          console.log('--------------------------------------------------------------');
          console.log('IMDB Rating: '+ body.imdbRating);     
          console.log('--------------------------------------------------------------');
          console.log('Rotten Tomatoes Rating: '+ body.tomatoRating);
          console.log('--------------------------------------------------------------');
          console.log('Countries Released in: '+ body.Country);
          console.log('--------------------------------------------------------------');
          console.log('Languages Released in: '+ body.Language);
          console.log('--------------------------------------------------------------');
          console.log('Plot: '+ body.Plot);
          console.log('--------------------------------------------------------------');
          console.log('Actors: '+ body.Actors);
          console.log('--------------------------------------------------------------');

          var movieData = {
            'Title': body.Title, 
            'Year Released': body.Year,
            'IMDB Rating': body.imdbRating,
            'Rotten Tomatoes Rating': body.tomatoRating,
            'Countries Released in': body.Country, 
            'Languages Released in': body.Language,
            'Plot': body.Plot, 
            'Actors': body.Actors     
          }
      }
  })
};
// Spotify - search 

function spotifySearch(userSearch) {
  console.log("loading");
  if(userSearch == undefined) {
      userSearch = "The Sign, By Ace of Base";
  }
  spotify.search({ type: 'track', query: userSearch, limit:20 }, function(error, response) {
  if ( error ) {
  console.log('Error occurred: ' + error);
  return;
  }
  console.log('--------------------------------------------------------------');
  console.log('Artist(s): ' + response.tracks.items[0].artists[0].name);
  console.log('--------------------------------------------------------------');
  console.log('Song Name: ' + response.tracks.items[0].name);
  console.log('--------------------------------------------------------------');
  console.log('Preview Link: ' + response.tracks.items[0].preview_url);
  console.log('--------------------------------------------------------------');
  console.log('Album: ' + response.tracks.items[0].album.name);
  console.log('--------------------------------------------------------------');
  
  var spotifyData = {
      'Artist(s)': response.tracks.items[0].artists[0].name,
      'Song Name': response.tracks.items[0].name,
      'Preview Link': response.tracks.items[0].preview_url,
      'Album': response.tracks.items[0].album.name
  }
  console.log(spotifyData);

});
}



// Twitter - 10 tweets


function tweetSearch() {
  console.log("loading");
  var myTweetsArray = [];

  //Twitter parameters and get method 
  var params = {screen_name: 'azs_003', limit: 10};

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
          var myTweets = "======================" + "\r\n" + "\r\n" + "Screen name: " + tweets[i].user.screen_name + "\r\n" + "\r\n" + "Tweet: " + tweets[i].text + "\r\n" + "\r\n" + "Tweet Posted On: " + tweets[i].created_at + "\r\n" + "\r\n" + "======================";
          console.log(myTweets);
          myTweetsArray.push(myTweets);
    
          var twitterData = {
              'Date Created': tweets[i].created_at,
              'Tweets': tweets[i].text
          }

      }
     
    }
  
  });
}


// Whatever You Say (Siri)

function whateverYouSay() {
  fs.readFile('random.txt', 'utf8', function(error, data) {
  
    if (error) {
      return console.log(error)
  }

});
}



var Tweets = new Twitter(key.twitterKeys);