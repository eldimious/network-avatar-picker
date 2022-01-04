const facebookService = require('./facebook');
const githubService = require('./github');
const gmailService = require('./gmail');
const instagramService = require('./instagram');
const tumblrService = require('./tumblr');
const twitterService = require('./twitter');
const vimeoService = require('./vimeo');
const youtubeService = require('./youtube');

module.exports.init = cacheService => ({
  facebookService: facebookService.init(cacheService),
  githubService: githubService.init(cacheService),
  gmailService: gmailService.init(cacheService),
  instagramService: instagramService.init(cacheService),
  tumblrService: tumblrService.init(cacheService),
  twitterService: twitterService.init(cacheService),
  vimeoService: vimeoService.init(cacheService),
  youtubeService: youtubeService.init(cacheService),
});
