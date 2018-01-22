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

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  for (i=0; i<result.length; i++)
  {
    console.log("Result",  result[i].avatar_url);
  }

});