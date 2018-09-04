var request = require('request');
var fs = require('fs');
var token = require('./secret');

console.log('Welcome to the GitHub Avatar Downloader!');
input = process.argv

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': token.GITHUB_TOKEN,
    }
  }
  
  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
  });
 
}

getRepoContributors(input[2], input[3], function(err, result) {
  for (var i = 0; i < result.length; i++) {
    
    downloadImageByURL(result[i].avatar_url, 'avatars/' + result[i].login + '.jpg')

  }
  
  console.log("Errors:", err);
});

function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {                                  
         throw err; 
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
       })
       .pipe(fs.createWriteStream('./' + filePath));    
}

