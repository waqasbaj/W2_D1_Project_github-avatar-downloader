var input = process.argv.slice(2);

if(input[0].length < 0 || input[1].length<0)
{
  console.log("Please enter a valid entry")
  return null;
}

var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

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

getRepoContributors(input[0], input[1], function(err, result) {
  console.log("Errors:", err);
  for (i=0; i<result.length; i++)
  {
    console.log("Result",  result[i].avatar_url);
    downloadImageByURL(result[i].avatar_url, result[i].login);
  }

});

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
              // Note 4

// Notes:
// 1. `request.get` is equivalent to `request()`
// 2. `request.on('error', callback)` handles any error
// 3. `request.on('response, callback)` handles the response
// 4. What is happening here?

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "/avatars");
