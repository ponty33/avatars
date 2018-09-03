var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');
input = process.argv

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token',
    }
  }
  
  
  
  
  request(options, function(err, res, body) {
    cb(err, body);
  });
 
}

getRepoContributors(input[2], input[3], function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

