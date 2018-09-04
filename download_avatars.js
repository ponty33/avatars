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
    console.log((JSON.parse(body)[0].avatar_url))
  });
 
}

getRepoContributors(input[2], input[3], function(err, result) {
  var url = [];
  for (var i = 0; i < result.length; i++) {
    url.push(result[i].avatar_url);
  }
  
  console.log("Errors:", err);
  console.log("Result:", url);
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

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")
