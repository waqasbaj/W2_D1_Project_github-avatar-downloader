//Get input from command line and make sure its a valid input.

// Otherwise, tell use to give the values again and return null

var input = process.argv.slice(2);

if(input[0].length < 0 || input[1].length<0)
{
  console.log("Please enter a valid entry")
  return null;
}

// Initiate the request call

var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

// Function for requesting the data from the url.
//The function will return an error if something doesn't go well.

function getRepoContributors(repoOwner, repoName, cb) {
  var options ={
    url:"https://api.github.com/repos/" + repoOwner + "/" + repoName +"/contributors",
    headers:{'User-Agent': 'request',
              'Authorization': '10eb148eda4c6a4447cf08a76d2fbe3464517a6d'}};
  request(options, function(err, res, body) {
    body = JSON.parse(body);
    cb(err, body);

  });
}

// Using user input of the given Repo name and Repo owner from the command line, the
//getRepoContributors function is initiated which  loops through all the users and invokes the function
// downloadImageByURL funciton to start extracting the jpgs for each person in the repo

getRepoContributors(input[0], input[1], function(err, result) {
  console.log("Errors:", err);
  for (i=0; i<result.length; i++)
  {
    console.log("Result",  result[i].avatar_url);
    downloadImageByURL(result[i].avatar_url, result[i].login);
  }

});


//When this downloadImageByURL function is invoked, it downloads each jpg from the given url
//And saves the output to the given file path, and the file names are basically indiviual id.

function downloadImageByURL(url, filePath ) {

// require `request` and the Node `fs` (filesystem) module
var request = require('request');
var fs = require('fs');

request.get(url)
              // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {
        console.log('Downloading image...');                          // Note 3
         console.log('Response Status Code: ', response.statusCode);
         console.log('Response Message: ', response.statusMessage);
         console.log('Content Type: ', response.headers['content-type']);

       })
       .on('end', function() {
        console.log('Download complete.');
        })
        .pipe(fs.createWriteStream('./avatars/'+filePath+'.jpg'))
}

